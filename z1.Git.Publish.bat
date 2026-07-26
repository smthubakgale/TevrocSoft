@echo off
setlocal enabledelayedexpansion

:: Ensure git is on PATH by adding a common install location if present
set "GITPATH="
if exist "%ProgramFiles%\Git\cmd\git.exe" set "GITPATH=%ProgramFiles%\Git\cmd"
if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" if not defined GITPATH set "GITPATH=%LOCALAPPDATA%\Programs\Git\cmd"
if defined GITPATH set "PATH=%GITPATH%;%PATH%"

:: Verify git is available
git --version >nul 2>&1 || (
	echo Git not found on PATH. Please install Git or update PATH.
	exit /b 1
)

:: Verify we're inside a git repository
git rev-parse --is-inside-work-tree >nul 2>&1 || (
	echo Not inside a git repository. Aborting.
	exit /b 1
)

echo Scanning for changed files (git status --porcelain)...

set "FILES="
set "FILELIST="
for /f "delims=" %%i in ('git status --porcelain') do (
	set "line=%%i"
	rem extract filename starting at position 4 (index 3)
	set "file=!line:~3!"
	if not defined FILES (
		set "FILES=!file!"
		set "FILELIST=!file!"
	) else (
		set "FILES=!FILES! !file!"
		set "FILELIST=!FILELIST!, !file!"
	)
)

if not defined FILES (
	echo No changes detected. Nothing to commit.
	endlocal
	exit /b 0
)

echo Files to commit: !FILELIST!

:: Stage only the changed files
for %%f in (!FILES!) do (
	git add "%%f"
)

:: Use provided COMMIT_MSG env var if present, otherwise build one
if defined COMMIT_MSG (
	set "MSG=%COMMIT_MSG%"
) else (
	set "MSG=Auto-publish: !FILELIST! - %DATE% %TIME%"
)

git commit -m "!MSG!" || (
	echo Commit failed or nothing to commit.
	endlocal
	exit /b 1
)

for /f "delims=" %%b in ('git rev-parse --abbrev-ref HEAD') do set "BRANCH=%%b"
echo Pushing to origin/!BRANCH!...
git push origin "!BRANCH!" || (
	echo Git push failed.
	endlocal
	exit /b 1
)

endlocal

