#!/usr/bin/env bash

version="$1"
url="https://github.com/edosrecki/google-cloud-sql-cli/releases/download/v$version/google-cloud-sql-macos-$version.tar.gz"
checksum=$(shasum -a 256 bin/google-cloud-sql-macos.tar.gz | awk '{ print $1 }')

git clone "https://${HOMEBREW_TOOLS_TOKEN}@github.com/edosrecki/homebrew-tools.git"
cd homebrew-tools

git config user.email "${GIT_EMAIL}"
git config user.name "Dinko Osrecki"

generate_formula() {
  local class_name="$1"
  cat <<EOF
class ${class_name} < Formula
  desc "Connect to private Google Cloud SQL/AlloyDB instance through Cloud SQL/AlloyDB Auth Proxy running in GKE cluster."
  homepage "https://github.com/edosrecki/google-cloud-sql-cli"
  url "$url"
  sha256 "$checksum"
  version "$version"
  def install
    bin.install "google-cloud-sql"
  end
  test do
    system "#{bin}/google-cloud-sql", "--version"
  end
end
EOF
}

# Create latest version formula
generate_formula "GoogleCloudSql" > google-cloud-sql.rb
# Create versioned formula
versioned_formula="google-cloud-sql@${version}.rb"
generate_formula "GoogleCloudSqlAT${version//./}" > "$versioned_formula"

git add google-cloud-sql.rb "$versioned_formula"
git commit -m "chore: release google-cloud-sql v$version"
git push

cd ..
rm -rf homebrew-tools
