# Lab 05 Report — Builds, Dependencies and Versioned Artifacts
**Course:** DevOps Principles and Practices  
**Student:** Ahsan Ali  
**Repository:** https://github.com/Eemaan76/FYP-210  

---

## 1. Direct vs Transitive Dependencies
* **Declared Dependencies:** 1 (`markdown-it`)
* **Total Packages Installed:** 7

### `npm ls --all` Output:
```text
devops-pipeline@1.0.0 /home/ahsan/devops/lab05
`-- markdown-it@15.0.3
  +-- argparse@3.0.4
  +-- entities@8.1.0
  +-- linkify-it@6.1.0
  | `-- uc.micro@3.0.0 deduped
  +-- mdurl@2.1.0
  +-- punycode.js@2.3.1
  `-- uc.micro@3.0.0
```

---

## 2. Deduped Dependency Explanation
* **Deduped Line:** `| \`-- uc.micro@3.0.0 deduped`
* **Explanation:** Both `markdown-it` and `linkify-it` require `uc.micro` as a dependency. Because their required version ranges overlap, npm resolved and installed a single shared instance of `uc.micro` instead of duplicating it. Without deduplication, npm would have had to install two copies nested inside separate subdirectories, wasting disk space and causing potential runtime version conflicts.

---

## 3. Semantic Version Range (`^15.0.3`)
* **What it permits:** Any version `>= 15.0.3` and `< 16.0.0` (all backward-compatible minor and patch releases).
* **What it forbids:** Any version `< 15.0.3` or any breaking major version `>= 16.0.0`.
* **Reproducibility Problem:** Because `^` specifies a flexible range rather than an exact pinned version, running `npm install` on different machines or on different dates can pull down different package versions, making builds non-deterministic and irreproducible without a lock file.

---

## 4. Lock File and Reproducibility Hashes
* **Two things `package-lock.json` records that `package.json` does not:**
  1. Exact pinned versions of every transitive dependency in the tree.
  2. Cryptographic content checksums (`sha512` integrity hashes) ensuring files are uncorrupted and untampered.

### Two Identical Hashes (from Section 6.3):
* **Hash 1:** `e9609d0f837789a54e606bc9e3e3cf75694e7714  -`
* **Hash 2:** `e9609d0f837789a54e606bc9e3e3cf75694e7714  -`
* **Comparison Result:** `IDENTICAL`

---

## 5. `npm ci` Refusal
### Error Output:
```text
npm error code EUSAGE
npm error `npm ci` can only install packages when your package.json and
npm error package-lock.json or npm-shrinkwrap.json are in sync. Please update
npm error your lock file with `npm install` before continuing.
npm error Missing: js-yaml@4.3.2 from lock file
```
* **Why this refusal is desirable:** This refusal is a vital security and stability safeguard that prevents CI/CD build servers from silently downloading untracked, unreviewed, or out-of-sync dependencies that were not committed in the lock file.

---

## 6. Semantic Versioning Decision (Section 7.1)
* **Chosen Version:** `1.1.0` (MINOR)
* **Reasoning:** We introduced a new feature (rendering Markdown sources into HTML output using `markdown-it`) while preserving the existing build and test contract without breaking backward compatibility for consumers.
* **Why others were rejected:**
  * Rejected `1.0.1` (PATCH) because this was a functional enhancement, not just an internal bug fix.
  * Rejected `2.0.0` (MAJOR) because no existing consumer workflow was broken in a backward-incompatible way that required consumer intervention.

---

## 7. Artifact Contents (Section 7.3)
### `tar -tzf devops-pipeline-1.1.0.tgz` Listing:
```text
package/tools/build.js
package/package.json
package/README.md
```
### Justification:
* `tools/build.js`: The core executable build script required to compile Markdown into HTML.
* `package.json`: The manifest containing metadata, binary mapping (`devops-build`), and runtime dependency definitions.
* `README.md`: Essential consumer documentation explaining tool usage and commands.
* *Note:* Build outputs (`out/`), source files (`src/`), tests (`test/`), and dependencies (`node_modules/`) are strictly excluded to ensure a lightweight and clean artifact.

---

## 8. Consumer `devDependencies` Failure Analysis (Section 7.5)
### `npm ls --all` Output from `/tmp/bad`:
```text
bad@1.0.0 /tmp/bad
`-- devops-pipeline@1.1.0
```
* **Tree Explanation:** The tree shows that nothing was installed underneath `devops-pipeline@1.1.0`. Because `markdown-it` was incorrectly classified under `devDependencies` instead of `dependencies`, npm intentionally omitted it during production installation for the end-user, resulting in `Cannot find module 'markdown-it'` when executed.

---

## 9. Published Package / Release URL
* **Release URL:** https://github.com/Eemaan76/FYP-210/releases/tag/v1.1.0

---

## 10. Fallbacks Used
* As authorized by the laboratory manual (Section 8.6), we used the **GitHub Release fallback** to publish the versioned `.tgz` artifact directly to the team repository releases under the `v1.1.0` tag.
