# XML DIFF

## Overview

- Provides difference between two XMLS
- Ignores namespaces

## Usage

```
npm install -f xmldiff
xmldiff file1.xml file2.xml
```

## Output

Output has three sections
1. Elements not present in RHS (file2)  
2. Elements not present in LHS (file1)
3. Difference in values
