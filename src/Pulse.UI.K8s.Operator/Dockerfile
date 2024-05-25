#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/runtime:6.0.1-bullseye-slim AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0.101-bullseye-slim AS build
WORKDIR /src
COPY ["src/Pulse.UI.K8s.Operator/Pulse.UI.K8s.Operator.csproj", "src/Pulse.UI.K8s.Operator/"]
RUN dotnet restore "src/Pulse.UI.K8s.Operator/Pulse.UI.K8s.Operator.csproj"
COPY . .
WORKDIR "/src/src/Pulse.UI.K8s.Operator"
RUN dotnet build "Pulse.UI.K8s.Operator.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Pulse.UI.K8s.Operator.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Pulse.UI.K8s.Operator.dll"]
