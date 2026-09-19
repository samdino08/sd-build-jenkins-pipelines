# My Website

Static website deployed to a web server by Jenkins.

## Files
- `Jenkinsfile`: pipeline definition (checkout, build, test, archive, deploy)
- `index.html`, `about.html`: pages
- `css/`, `js/`: styles and scripts

## Deploy flow
1. Push to `main`
2. Jenkins pulls the repo and runs the `Jenkinsfile`
3. The `dist/` output is synced to the web server over SSH (rsync)

## Jenkins settings
- Credential ID: `deploy-server-ssh` (SSH Username with private key)
- Edit `DEPLOY_HOST`, `DEPLOY_PATH`, `SSH_CRED_ID` in the `Jenkinsfile`
- Required plugins: Pipeline, Git, SSH Agent
- Required tools on Jenkins agent: `rsync` (and Node/npm if you add a `package.json`)
