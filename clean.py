import subprocess
import sys
import threading
def un(pkg):
    pkg_name = pkg.split("==")[0]
    if pkg_name.lower() != "pip":
        subprocess.run(
            [sys.executable, "-m", "pip", "uninstall", "-y", pkg_name],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
def unall():
    result = subprocess.run(
        [sys.executable, "-m", "pip", "list", "--format=freeze"],
        capture_output=True, text=True, check=True
    )
    packages = result.stdout.splitlines()
    ths = []
    for pkg in packages:
        thread = threading.Thread(target=un, args=(pkg,))
        thread.start()
        ths.append(thread)
    for th in ths:
        th.join()
    print("done")
if __name__ == "__main__":
    unall()
