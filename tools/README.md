# Website tools

## IndexNow submission

Submit specific changed or new pages from the repository root:

```text
node tools/indexnow-submit.js /contact /services
node tools/indexnow-submit.js contact.html blog/index.html
```

Running with no arguments submits changed and untracked HTML pages detected by Git:

```text
node tools/indexnow-submit.js
```

The command reads the public IndexNow key from `indexnow-key.txt`, converts HTML filenames to the site's clean canonical URLs, removes duplicates, and rejects URLs outside `https://bizitsolutions.com.au`. Deploy the root key file before submitting URLs.
