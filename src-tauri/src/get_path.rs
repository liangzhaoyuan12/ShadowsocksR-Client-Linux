// 用于获取目录的家目录(~/.ssr)
// root用户则为root文件夹，普通用户则为home文件夹

use std::path::PathBuf;
use nix::unistd::Uid;

/**
 * 用于获取目录的家目录(~/.ssr)
 */
pub fn home_dir() -> PathBuf {
    if is_root() {
        let path = PathBuf::from("/root/.ssr");
        return path;
    } else {
        let path = dirs::home_dir().unwrap().join(".ssr");
        return path;
    }
}

fn is_root() -> bool {
    Uid::effective().is_root()
}