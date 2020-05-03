#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["IIS_Tracker/IIS_Tracker.csproj", "IIS_Tracker/"]
RUN dotnet restore "IIS_Tracker/IIS_Tracker.csproj"
COPY . .
WORKDIR "/src/IIS_Tracker"
RUN dotnet build "IIS_Tracker.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "IIS_Tracker.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IIS_Tracker.dll"]