import {
	Activity,
	PanelLeft,
	SquareActivity,
	Webhook,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { Link } from "react-router-dom";


export const Menu = () => {
	return (
		<aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
			<nav className="flex flex-col items-center gap-4 px-2 py-4">
				<Link
					to="/"
					className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
				>
					<Activity className="h-4 w-4 transition-all group-hover:scale-110" />
					<span className="sr-only">Pulse UI</span>
				</Link>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							to="/"
							className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
						>
							<SquareActivity className="h-5 w-5" />
							<span className="sr-only">Healthchecks</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Healthchecks</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							to="webhooks"
							className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
						>
							<Webhook className="h-5 w-5" />
							<span className="sr-only">Webhooks</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent side="right">Webhooks</TooltipContent>
				</Tooltip>
			</nav>
		</aside>
	);
};

export const MenuHeader = () => {
	return (
		<header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
			<Sheet>
				<SheetTrigger asChild>
					<Button size="icon" variant="outline" className="sm:hidden">
						<PanelLeft className="h-5 w-5" />
						<span className="sr-only">Toggle Menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="sm:max-w-xs">
					<nav className="grid gap-6 text-lg font-medium">
						<Link
							to="/"
							className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
						>
							<Activity className="h-5 w-5 transition-all group-hover:scale-110" />
							<span className="sr-only">Pulse UI</span>
						</Link>
						<Link
							to="/"
							className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
						>
							<SquareActivity className="h-5 w-5" />
							Healthchecks
						</Link>
						<Link
							to="webhooks"
							className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
						>
							<Webhook className="h-5 w-5" />
							Webhooks
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
		</header>
	);
};
