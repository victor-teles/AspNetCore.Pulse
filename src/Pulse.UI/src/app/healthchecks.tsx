import { CirclePause, CirclePlay, ListFilter, RefreshCcw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { fetchHealthchecks } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Liveness, Check } from "@/types/api";
import { useState } from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Healthchecks() {
	const [pausePolling, setPausePolling] = useState(false);
	const [filter, setFilter] = useState("all");
	const healthchecksQuery = useQuery({
		queryKey: ["healthchecks"],
		queryFn: () => fetchHealthchecks(),
		refetchInterval: pausePolling ? undefined : 10 * 1000,
	});
	const healthchecks = healthchecksQuery.data?.filter((checks) => {
		if (filter === "all") return true;

		return filter === checks.status.toLocaleLowerCase();
	});

	function onPausePollingClick() {
		setPausePolling(!pausePolling);
	}

	function onRefreshClick() {
		healthchecksQuery.refetch();
	}

	function onFilterSelect(value: string) {
		return () => {
			setFilter(value);
		};
	}

	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<Menu />
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<MenuHeader />
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
					<div className="flex items-center">
						<div>
							<h2 className="text-2xl font-bold tracking-tight">
								Healthchecks
							</h2>
							<p className="text-muted-foreground">
								Here's a list of your Healthchecks!
							</p>
						</div>
						<div className="ml-auto flex items-center gap-2 self-end">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="sm" className="h-7 gap-1">
										<ListFilter className="h-3.5 w-3.5" />
										<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
											Filter
										</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Filter by</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuCheckboxItem
										checked={filter === "all"}
										onClick={onFilterSelect("all")}
									>
										All
									</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem
										checked={filter === "healthy"}
										onClick={onFilterSelect("healthy")}
									>
										Healthy
									</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem
										checked={filter === "unhealthy"}
										onClick={onFilterSelect("unhealthy")}
									>
										Unhealthy
									</DropdownMenuCheckboxItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="outline"
										size="sm"
										className="h-7 gap-1"
										onClick={onPausePollingClick}
									>
										{pausePolling ? (
											<CirclePlay className="h-3.5 w-3.5" />
										) : (
											<CirclePause className="h-3.5 w-3.5" />
										)}
										<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
											{pausePolling ? "Play" : "Pause"}
										</span>
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>10s polling interval</p>
								</TooltipContent>
							</Tooltip>
							<Button size="sm" className="h-7 gap-1" onClick={onRefreshClick}>
								<RefreshCcw className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
									Refresh
								</span>
							</Button>
						</div>
					</div>

					<HealthchecksTable healthchecks={healthchecks} />
				</main>
			</div>
		</div>
	);
}

const HealthchecksTable = ({ healthchecks }: { healthchecks?: Liveness[] }) => {
	return (
		<Card className="pt-6">
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Health</TableHead>
							<TableHead>On state form</TableHead>
							<TableHead className="hidden md:table-cell">
								Last execution
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{healthchecks?.map((healthcheck) => (
							<Collapsible key={healthcheck.name} asChild>
								<>
									<CollapsibleTrigger asChild>
										<TableRow className="cursor-pointer">
											<TableCell className="flex gap-2 items-center font-medium">
												<span className="relative flex h-3 w-3">
													<span
														className={cn(
															"animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
															{
																"bg-red-500":
																	healthcheck.status === "Unhealthy",
																"bg-green-500":
																	healthcheck.status === "Healthy",
															},
														)}
													/>
													<span
														className={cn(
															"relative inline-flex rounded-full h-3 w-3",
															{
																"bg-red-500":
																	healthcheck.status === "Unhealthy",
																"bg-green-500":
																	healthcheck.status === "Healthy",
															},
														)}
													/>
												</span>
												{healthcheck.name}
											</TableCell>
											<TableCell>
												<Badge
													variant={
														healthcheck.status === "Healthy"
															? "success"
															: "error"
													}
												>
													{healthcheck.status}
												</Badge>
											</TableCell>
											<TableCell>{healthcheck.onStateFrom}</TableCell>
											<TableCell className="hidden md:table-cell">
												{new Date(healthcheck.lastExecuted).toLocaleString()}
											</TableCell>
										</TableRow>
									</CollapsibleTrigger>
									<CollapsibleContent asChild>
										<TableRow>
											<TableCell colSpan={4}>
												<ChecksTable checks={healthcheck.entries} />
											</TableCell>
										</TableRow>
									</CollapsibleContent>
								</>
							</Collapsible>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

const ChecksTable = ({ checks }: { checks: Check[] }) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Health</TableHead>
					<TableHead>Description</TableHead>
					<TableHead className="hidden md:table-cell">Duration</TableHead>
					<TableHead className="hidden md:table-cell">Tags</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{checks?.map((check) => (
					<TableRow className="cursor-pointer" key={check.name}>
						<TableCell className="flex gap-2 items-center font-medium">
							<span className="relative flex h-3 w-3">
								<span
									className={cn(
										"animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
										{
											"bg-red-500": check.status === "Unhealthy",
											"bg-green-500": check.status === "Healthy",
										},
									)}
								/>
								<span
									className={cn("relative inline-flex rounded-full h-3 w-3", {
										"bg-red-500": check.status === "Unhealthy",
										"bg-green-500": check.status === "Healthy",
									})}
								/>
							</span>
							{check.name}
						</TableCell>
						<TableCell>
							<Badge variant={check.status === "Healthy" ? "success" : "error"}>
								{check.status}
							</Badge>
						</TableCell>
						<TableCell>{check.description}</TableCell>
						<TableCell className="hidden md:table-cell">
							{new Date(check.duration).toLocaleString()}
						</TableCell>
						<TableCell className="hidden md:table-cell space-x-2">
							{check.tags?.map((tag) => (
								<Badge key={tag} variant={"outline"}>
									{tag}
								</Badge>
							))}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
