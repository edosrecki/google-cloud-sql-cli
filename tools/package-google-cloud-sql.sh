#!/usr/bin/env bash

version="$1"

pnpm dlx replace-in-file '0.0.0-dev' "$version" ./src/lib/version.ts
pnpm build
pnpm bundle

cd bin
tar --transform s/-linux// -czf "google-cloud-sql-linux.tar.gz" google-cloud-sql-linux
tar --transform s/-macos// -czf "google-cloud-sql-macos.tar.gz" google-cloud-sql-macos
tar --transform s/-win// -czf "google-cloud-sql-win.tar.gz" google-cloud-sql-win.exe
cd ..
