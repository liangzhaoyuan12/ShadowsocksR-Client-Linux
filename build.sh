#!/bin/bash
set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
BINARY="$PROJECT_ROOT/src-tauri/target/release/shadowsocksr-client-linux"
DEB_DIR="$PROJECT_ROOT/src-tauri/target/release/bundle/deb"
RPM_DIR="$PROJECT_ROOT/src-tauri/target/release/bundle/rpm"
BUILD_DIR="$PROJECT_ROOT/build"
SIDECAR="$PROJECT_ROOT/src-tauri/binaries/ssr-native-client-x86_64-unknown-linux-gnu"

echo "==> Building release with Tauri..."
cd "$PROJECT_ROOT"
npm run tauri build

echo "==> Preparing build directory..."
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

# Copy deb/rpm packages
echo "==> Copying packages..."
cp "$DEB_DIR"/*.deb "$BUILD_DIR/" 2>/dev/null || true
cp "$RPM_DIR"/*.rpm "$BUILD_DIR/" 2>/dev/null || true

# Create tar.gz with the binary + sidecar
echo "==> Creating portable tar.gz..."
TAR_DIR="$BUILD_DIR/shadowsocksr-client-linux"
mkdir -p "$TAR_DIR"
cp "$BINARY" "$TAR_DIR/"
cp "$SIDECAR" "$TAR_DIR/"
cat > "$TAR_DIR/README.txt" << 'EOF'
ShadowsocksR Client for Linux - Portable

Requirements: gtk3, webkit2gtk4.1

Usage:
  ./shadowsocksr-client-linux

The sidecar binary (ssr-native-client) must be in the same directory.
EOF
cd "$BUILD_DIR"
tar -czf "shadowsocksr-client-linux.tar.gz" "shadowsocksr-client-linux"
rm -rf "$TAR_DIR"

echo "==> Done! Output in: $BUILD_DIR"
ls -lh "$BUILD_DIR"
