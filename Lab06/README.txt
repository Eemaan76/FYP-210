LAB 06 — PROVIDED FILES AND PRE-LAB CHECKS
DevOps Principles and Practices (2+1)


DO THIS BEFORE THE SESSION
==========================

1. MAKE SURE LAB 05 IS ON YOUR TEAM REPOSITORY'S main

     cd ~/devops/devops-project-TEAMNAME
     git switch main && git pull
     ls          # Makefile, package.json, package-lock.json, tools/ src/ test/

   Today's pipeline runs `make ci` from that repository. If it is not on
   main, nothing in this lab works.

2. PROVE IT BUILDS FROM A CLEAN CLONE (this is Task 1 — do it early)

     cd ~/devops
     git clone https://github.com/OWNER/devops-project-TEAMNAME.git fresh-check
     cd fresh-check && make ci

   If this fails, something your build needs was never committed. Fix it
   before the session and you will have a much easier afternoon.

3. CHECK YOUR LAB 04 RULESET IS STILL ACTIVE

   Team repository -> Settings -> Rules -> Rulesets. Enforcement status must
   say Active. Task 4 edits this ruleset.

4. EVERY TEAM MEMBER NEEDS PUSH ACCESS

   Task 4 is done in pairs, on two branches of the same repository. Check
   that everyone in your team can push a branch.


WHAT IS IN THIS ZIP
===================

  Lab06_First_CI_Pipeline.pdf   The manual.

  fallback/                     The Lab 05 model answer (Makefile,
                                package.json, tools/, src/, test/).
                                ONLY for teams with no working Lab 05
                                project. Run `npm install` once to create
                                the lock file, commit everything through a
                                pull request, and SAY SO IN YOUR REPORT.
                                You lose no marks for using it. You lose
                                marks for not saying.


WHAT IS NOT IN THIS ZIP, AND WHY
================================

No workflow file. The outcome this lab is assessed against is L-CLO-1 at P3 —
precision in carrying out a procedure — and this is the lab the outcome is
named after. You type the workflow, you configure the gate, you break the
build on purpose. The manual gives you every line; it does not give you the
file.
