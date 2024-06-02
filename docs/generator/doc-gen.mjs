import { unified } from "unified";
import remarkParse from "remark-parse";
import fs from "node:fs/promises";
import path from "node:path";
import { toMarkdown } from "mdast-util-to-markdown";
import { glob } from "glob";
import { parseCsproj, extractPropValue } from "./csproj-parser.mjs";
import mint from "../mint.json" assert { type: "json" };

const projectRoot = "../../src";
const projectBuild = "../../build";

const slugify = (text) => {
	return text
		.toString()
		.normalize("NFKD")
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-")
		.replace(/[^\w\-]+/g, "")
		.replace(/\_/g, "-")
		.replace(/\-\-+/g, "-")
		.replace(/\-$/g, "");
};

const packages = (await fs.readdir(projectRoot)).filter(
	(path) =>
		!path.includes("Pulse.UI") &&
		!path.includes("Pulse.Publisher") &&
		path.includes("Pulse"),
);

const template = (await fs.readFile("package.template.mdx")).toString("utf-8");
const installationTemplate = (
	await fs.readFile("installation.template.mdx")
).toString("utf-8");
const versionProps = (
	await fs.readFile(path.join(projectBuild, "versions.props"))
).toString("utf-8");
const healthchecks = mint.navigation.find(
	(nav) => nav.group === "Healthchecks",
);
healthchecks.pages = ["quickstart"];

for (const packageName of packages) {
	const readMePath = path.join(projectRoot, packageName, "readme.md");
	const [csprojPath] = await glob(
		path.join(projectRoot, packageName, "*.csproj"),
	);
	const csprojStr = await fs.readFile(csprojPath);
	const csproj = parseCsproj(csprojStr.toString("utf-8"));
	const docKind = csproj.extras.find(
		(extra) => extra.name === "DocKind",
	)?.value;
	const projectVersionTag = csproj.extras
		.find((extra) => extra.name === "VersionPrefix")
		?.value?.replace("$", "")
		?.replace("(", "")
		?.replace(")", "");
	const version = extractPropValue(versionProps, projectVersionTag);
	const readMeFile = await fs.readFile(readMePath);
	const processor = unified().use(remarkParse);
	const tokens = processor.parse(readMeFile);

	const packageTitle = tokens.children.shift()?.children?.at(0)?.value?.trim();
	const description = toMarkdown(tokens.children.shift())?.trim();

	let installationContent = installationTemplate;
	installationContent = installationContent.replaceAll("{{version}}", version);
	installationContent = installationContent.replaceAll(
		"{{packageName}}",
		`AspNetCore.${path.parse(csprojPath).name}`,
	);

	let packageContent = template;
	packageContent = packageContent.replace(
		"{{installation}}",
		installationContent,
	);
	packageContent = packageContent.replace("{{title}}", packageTitle);
	packageContent = packageContent.replace("{{description}}", description);
	packageContent = packageContent.replace("{{content}}", toMarkdown(tokens));
	packageContent = packageContent.replace("{{icon}}", docKind);

	const pageName = slugify(packageTitle);
	const templateFileName = `${pageName}.mdx`;
	await fs.writeFile(
		path.join("..", "packages", templateFileName),
		packageContent,
	);

	healthchecks.pages.push(`packages/${pageName}`);

	await fs.writeFile(path.join("..", "mint.json"), JSON.stringify(mint, null, 2));
}
