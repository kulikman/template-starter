#!/usr/bin/env bash
# Creates the folder layout from CLAUDE.md (project structure) plus docs/adr.
# Intended for an empty new project directory. Copies CLAUDE.md and AGENTS.md
# from this template repository when the script lives under scripts/.
#
# Usage:
#   bash scripts/init-project-structure.sh [TARGET_DIR]
#   bash scripts/init-project-structure.sh --force [TARGET_DIR]
#   bash scripts/init-project-structure.sh --dry-run [TARGET_DIR]
#
# From another machine (after clone or with local copy of the script + docs):
#   bash /path/to/template-starter/scripts/init-project-structure.sh ~/Projects/my-app

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
if [[ -n "${TEMPLATE_STARTER_ROOT:-}" ]]; then
  REPO_ROOT="$(cd "${TEMPLATE_STARTER_ROOT}" && pwd)"
fi

DRY_RUN=false
FORCE=false
TARGET=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --)
      shift
      continue
      ;;
    --dry-run | -n)
      DRY_RUN=true
      shift
      ;;
    --force | -f)
      FORCE=true
      shift
      ;;
    -h | --help)
      cat <<'EOF'
Usage: init-project-structure.sh [options] [TARGET_DIR]

Creates src/* and docs/adr per CLAUDE.md; copies CLAUDE.md, AGENTS.md, .env.example from this repo.

Options:
  --dry-run, -n   Print actions without changing files
  --force, -f     Run even if the target directory is not empty
  --help, -h      Show this help

Default TARGET_DIR is the current directory.
EOF
      exit 0
      ;;
    *)
      if [[ -n "${TARGET}" ]]; then
        echo "Unexpected argument: $1" >&2
        exit 1
      fi
      TARGET="$1"
      shift
      ;;
  esac
done

if [[ -z "${TARGET}" ]]; then
  TARGET="."
fi

TARGET="$(cd "${TARGET}" && pwd)"

run() {
  if [[ "${DRY_RUN}" == true ]]; then
    echo "[dry-run] $*"
  else
    "$@"
  fi
}

mkdir_p() {
  run mkdir -p "$1"
}

touch_keep() {
  local f="$1/.gitkeep"
  if [[ "${DRY_RUN}" == true ]]; then
    echo "[dry-run] touch ${f}"
  else
    mkdir -p "$1"
    [[ -f "${f}" ]] || touch "${f}"
  fi
}

if [[ ! -d "${TARGET}" ]]; then
  echo "Target is not a directory: ${TARGET}" >&2
  exit 1
fi

has_other=false
while IFS= read -r -d '' p; do
  base="$(basename "${p}")"
  if [[ "${base}" == ".git" ]]; then
    continue
  fi
  has_other=true
  break
done < <(find "${TARGET}" -mindepth 1 -maxdepth 1 -print0 2>/dev/null)

if [[ "${has_other}" == true && "${FORCE}" != true ]]; then
  echo "Target directory is not empty (ignoring .git): ${TARGET}" >&2
  echo "Re-run with --force to continue anyway." >&2
  exit 1
fi

echo "Initializing project structure in: ${TARGET}"

# CLAUDE.md — Project Structure (+ docs/adr from workspace standards)
paths=(
  "src/app/(auth)"
  "src/app/(dashboard)"
  "src/app/api"
  "src/components/ui"
  "src/components/forms"
  "src/components/layout"
  # Route groups use (name); feature components live in dedicated folders — use features/ as the default bucket
  "src/components/features"
  "src/lib/supabase"
  "src/hooks"
  "src/types"
  "src/styles"
  "src/config"
  "docs/adr"
  "public"
)

for rel in "${paths[@]}"; do
  mkdir_p "${TARGET}/${rel}"
  touch_keep "${TARGET}/${rel}"
done

copy_doc() {
  local name="$1"
  local src="${REPO_ROOT}/${name}"
  local dest="${TARGET}/${name}"
  if [[ ! -f "${src}" ]]; then
    echo "Skip missing template file: ${src}" >&2
    return 0
  fi
  if [[ "${DRY_RUN}" == true ]]; then
    echo "[dry-run] cp ${src} ${dest}"
  else
    cp "${src}" "${dest}"
    echo "Copied ${name}"
  fi
}

copy_doc "CLAUDE.md"
copy_doc "AGENTS.md"
if [[ -f "${REPO_ROOT}/.env.example" ]]; then
  copy_doc ".env.example"
fi

if [[ "${DRY_RUN}" != true ]]; then
  echo "Done. Next: create or clone a Next.js app, or copy the rest of this template from https://github.com/kulikman/template-starter"
fi
