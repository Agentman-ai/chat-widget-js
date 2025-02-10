# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 0.13.x   | :white_check_mark: |
| < 0.13.0   | :x:                |

## Reporting a Vulnerability

Please report (suspected) security vulnerabilities to
**[INSERT SECURITY EMAIL]**. You will receive a response from
us within 48 hours. If the issue is confirmed, we will release a patch as soon
as possible depending on complexity but historically within a few days.

## Disclosure Policy

When we receive a security bug report, we will assign it to a
primary handler. This person will coordinate the fix and release
process, involving the following steps:

  * Confirm the problem and determine the affected versions.
  * Audit code to find any potential similar problems.
  * Prepare fixes for all releases still under maintenance.
  * Release new versions and update the npm package.
