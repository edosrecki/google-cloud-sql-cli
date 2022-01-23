#!/usr/bin/env bash

version="$1"
url="https://github.com/edosrecki/google-cloud-sql-cli/releases/download/v$version/google-cloud-sql-macos-$version.tar.gz"
checksum=$(shasum -a 256 bin/google-cloud-sql-macos.tar.gz | awk '{ print $1 }')

git clone "https://${HOMEBREW_TOOLS_TOKEN}@github.com/edosrecki/homebrew-tools.git"
cd homebrew-tools

git config user.email "${GIT_EMAIL}"
git config user.name "Dinko Osrecki"

cat <<EOF > google-cloud-sql.rb
class GoogleCloudSql < Formula
  desc ""
  homepage "https://github.com/edosrecki/google-cloud-sql-cli"
  url "$url"
  sha256 "$checksum"
  bottle :unneeded
  def install
    bin.install "google-cloud-sql"
  end
  test do
    system "#{bin}/google-cloud-sql", "--version"
  end
end
EOF

git add google-cloud-sql.rb
git commit -m "chore: release google-cloud-sql v$version"
git push

cd ..
rm -rf homebrew-tools
