import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Menu, MenuHeader } from "@/components/menu";
import { useQuery } from "@tanstack/react-query";
import { fetchWebhooks } from "@/lib/api";
import type { WebHook } from "@/types/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

export default function Webhooks() {
	const webhooksQuery = useQuery({
		queryKey: ["webhooks"],
		queryFn: () => fetchWebhooks(),
	});
	const webhooks = webhooksQuery.data;

	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<Menu />
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<MenuHeader />
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
					<div className="flex items-center">
						<div>
							<h2 className="text-2xl font-bold tracking-tight">Webhooks</h2>
							<p className="text-muted-foreground">
								Here's a list of your Webhooks!
							</p>
						</div>
					</div>

					{webhooksQuery.isLoading && <Skeleton />}
					{!webhooksQuery.isLoading && <WebhooksTable webhooks={webhooks} />}
				</main>
			</div>
		</div>
	);
}

const WebhooksTable = ({ webhooks }: { webhooks?: WebHook[] }) => {
	if (!webhooks || webhooks?.length === 0)
		return (
			<Alert>
				<TriangleAlert className="h-4 w-4" />
				<AlertTitle>Oh no!</AlertTitle>
				<AlertDescription>No webhooks configured</AlertDescription>
			</Alert>
		);

	return (
		<Card className="pt-6">
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Host</TableHead>
							<TableHead>Payload</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{webhooks?.map((webhook) => (
							<TableRow key={webhook.name}>
								<TableCell className="font-medium">{webhook.name}</TableCell>
								<TableCell>{webhook?.host ?? "-"}</TableCell>
								<TableCell>{JSON.stringify(webhook.payload)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};
