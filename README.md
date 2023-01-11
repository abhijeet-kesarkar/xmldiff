# XML DIFF

## Overview

- Provides difference between two XMLS
- Ignores namespaces

## Usage

Step 1 Install the utility
```
npm install -g git+https://gitlab.cd.auspost.com.au/kersarkaa/xmldiff.git
```

Step 2 Run the diff command
```
xmldiff file1.xml file2.xml
```

Or alternatively, Step1+Step2 in single command, without installing utility
```
npx git+https://gitlab.cd.auspost.com.au/kersarkaa/xmldiff.git file1.xml file2.xml
```
## Output

Output has three sections
1. Elements not present in RHS (file2)  
2. Elements not present in LHS (file1)
3. Difference in values
