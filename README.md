# eDKP 2025 Guide

## Table of Contents
- [Requirements](#requirements)
- [Constraints](#constraints)
- [Setup](#setup)
- [Recommended Stacks](#recommended-stacks)
- [Delieverables](#deliverables)
- [Best Practices](#best-practices)

## General Information
Welcome to the eDKP 2025 hackathon.  
This guide will help you get up and running quickly so you can get started hacking.

## Requirements
1. At least 1 person in your team must bring a laptop that has Python3 installed, and is able to run Python code in your IDE of choice.  
2. Your own laptop **MUST** be able to access OpenHands Cloud ([link](https://app.all-hands.dev/)) and Github ([link](https://github.com/)).
3. If your usecase requires data, please bring either of the following:  
i. Prepare (eg. mask / anonymize) and bring your own data.  
ii. If you need news data, inform us and we will provide you with a Tavily API key. ([ref](#3-tavily-for-news-related-team-only))

## Constraints
1. OpenHands Cloud instance resources: 4 CPU, 16Gb RAM
2. No GPUs
3. No dedicated databases / object storage facilities

## Setup
Follow the setup steps in this order:
### 1. Github
Github is a platform to share code for collaborative development.  
Your team repositories have been prepared for you beforehand. Check that you are able to access it using the steps below:
1. Create your Github account by following the registration instructions on their sign-up page. ([link](https://github.com/signup?source=login))  
3. Provide the Tech Facilitators with your Github username / email. We have to grant you access to the eDKP2025 Github resources.
4. After obtaining access, go to the eDKP2025 Github page. ([link](https://github.com/edkp-2025/))
5. Sign in with your login credentials.
6. A Github repository has been created for each of your teams:  
<img src="assets/images/readme-github-repo1.png">  
7. Click into your team's repository. It should be completely empty.  
8. We encourage you to rename your repository. Click onto the 'Settings' tab, thereafter change the value in the text field:  
<img src="assets/images/readme-github-repo2.png">  
9. Create different feature branches per member (this helps to manage conflicts when writing to the same files):   
i. Click on the drop-down under your repository's name that either has 'main' / 'master' (this is your branch selector).  
ii. Type the name of your new branch to create it.  
<img src="assets/images/readme-bestpractices-github.png">  

> ⚠️ **DO NOT** create more than 1 repo per team  

> ℹ️ For information on how your team should use Github for collaboration, please refer [here](#best-practices)

### 2. OpenHands Cloud
OpenHands Cloud is a low to no-code AI-assisted coding platform that is accessible as a webapp in your browser. It is integrated tightly with Github, which allows it to seamlessly build your code and merge it to your Github repository. We will be using 'OpenHands' and 'OpenHands Cloud' synonymously.  
Follow the steps below to access OpenHands:
1. Navigate to OpenHands Cloud. ([link](https://app.all-hands.dev/))
2. Register with your Github login credentials to sync OpenHands Cloud with your Github account.  
3. There may be a pop-up to grant OpenHands permissions to access the Github account. If it appears, click on the 'Authorize' button.  
<img src="assets/images/readme-openhands-authgithub.png" height="500">  
4. If there is a pop-up to accept terms of service, accept it.
5. At the bottom left of the OpenHands UI, hover your mouse over your user avatar / icon. Click on 'API Keys'.  
<img src='assets/images/readme-openhands-apikeys.png' height="400">  
6. In the 'API Keys' settings menu that shows up, follow your Tech Facilitator's instructions on the values to input into the fields to setup your LLM connection. An example is shown below:  
<img src='assets/images/readme-openhands-anthropic.png' height="500"> 
7. Head back to the main page for OpenHands.
8. Within the 'Open Repository' box, click on the 'user/repo' drop-down selector and choose your Team's repository.  
i. Your team's Github repository should already be added to OpenHands:  
<img src="assets/images/readme-openhands-selectrepo.png">  
ii. Otherwise, click on '+ Add Github Repos'. A new tab should pop-up where you need to select on your Team's repo, then click 'Update access' to grant OpenHands permission to access the repo.  
<img src="assets/images/readme-openhands-authrepo.png" height="500">  
9. Head back to the OpenHands main page and you should now be able to select your team's Github repository.
10. Click on the 'Select branch...' drop-down selector and choose the feature branch you created. ([see](#1-github)  Setup>Github>Step6)  
11. Click on the 'Launch' button to start your session.  
12. Use the chat interface to start vibe-coding. Refer to the [best practices](#best-practices) section below for tips on how to get the most out of OpenHands Cloud!

> ℹ️ For information on how to use 👐 OpenHands Cloud, please refer to the official [docs](https://docs.all-hands.dev/)

### 3. Tavily (For news-related team only)
Tavily is a tool that enables search and extraction of web content, typically for LLM usage.  
You can setup a 'Free Tier' account that has 1000 credits to start off.
Should you finish these credits, please reach out to your facilitator an API key.

> ℹ️ For information on how to use Tavily, please refer to the official [docs](https://docs.tavily.com/documentation/api-reference/endpoint/search).

## Recommended Stacks
1. Python: FastAPI backend + Streamlit frontend 
2. Javascript: Next.js
> ⚠️ Javascript may not have all the same ML / NLP libraries in Python.  

## Deliverables
1. Final presentation.
2. 🥳**Bonus**🥳 A working app that runs locally in your machine.

## Best Practices
### Collaborating using Github
- Typically a team using Github would create a main branch to host stable / tested code, whilst team members can concurrently develop on feature branches. This enables version control when merging code with conflicts (think of writing over the same sentence in a shared Word .docx).
- When working on a feature, the Git / Github workflow should look something like this (🟠 for action taken using Git, 🔵 for GitHub):
    ```mermaid
    graph LR
        A[main branch] --> B[git checkout -b feature-branch]
        B --> C[Make code changes]
        C --> D[git add .]
        D --> E["git commit -m 'message'"]
        E --> F[git push origin feature-branch]
        F --> G[Create Pull Request]
        G --> H[Code Review]
        H --> I[Merge Pull Request]

        classDef git fill:#f96,stroke:#333,stroke-width:2px
        classDef github fill:#6cf,stroke:#333,stroke-width:2px

        class A,B,C,D,E,F,K,L git
        class G,H,I,J github
    ```

> ⚠️ Do get your teammates to review your code before merging the pull request!

> ℹ️ For information on the typical Git + Github workflow, please refer to the this tutorial [video](https://www.youtube.com/watch?v=nCKdihvneS0).

> ℹ️ For information on 👐 OpenHands Cloud + Github integration, please refer to the the official [docs](https://docs.all-hands.dev/usage/cloud/github-installation#working-with-github-repos-in-openhands-cloud).


### Vibe-Coding using 👐 OpenHands Cloud
1. For cost-effectiveness, use [GPT](chatgpt.com) or [Claude](claude.ai) to generate:  
    i. a Product Requirements Document (PRD). You can insert your own specifications within this sample AI-generated  prompt and use it:
    ```
    **Role:**
    You are a senior product manager tasked with creating a comprehensive Product Requirements Document (PRD). 
    Based on the inputs provided, generate a well-structured PRD that includes all essential sections.

    **User Inputs:**
    User Story Narrative: [Insert detailed user journey/story describing the problem, context, and desired outcome]
    Feature Descriptions: [Insert specific feature details, capabilities, and functionality]
    Include Testing: [Yes/No]

    **Task**
    Generate a PRD with the following structure:

    Executive Summary - Brief overview and business rationale  
    Problem Statement - Clear definition of the problem being solved  
    User Personas & Use Cases - Target users and their scenarios   
    Feature Requirements - Detailed functional specifications  
    User Experience Requirements - UX/UI considerations  
    Technical Requirements - Product app is expected to run using 4 CPU and 16Gb RAM.  
    [If testing selected] Testing Strategy - Test scenarios, acceptance criteria, and validation approach  
    ```  
  
    ii. a checklist execution plan. You can insert your own specifications within this sample prompt and use it:
    ```
    **Task**
    Based on the PRD below, create an execution plan for my AI developer agent in the form of a checklist:

    **PRD**
    [Copy-Paste your AI-generated PRD here]
    ```  
2. Go to OpenHands and copy paste your PRD and Execution Plan into a chat under your feature branch:
    ```
    **Task**
    I want to create my app based on the PRD and Execution Plan below.
    Review these documents and develop my app.

    **IMPORTANT**
    1. Keep the code as simple as possible without overcomplicating things.
    2. Clarify with me if you have any questions or doubts. You ABSOLUTELY must not make any assumptions on your own.
    3. Any use of API calls should be hyperparameterised either by using a config.yaml file OR by exposing a user input field in the Front-End UI.

    **PRD**
    [Copy-Paste PRD here]

    **Execution Plan**
    [Copy-Paste Execution Plan here]
    ```
3. You can review the code generated under the 'Changes' tab in OpenHands - changes are organized by the files they are written in. Thereafter, you can get OpenHands to run unit / integration tests, and fix any bugs.
4. Save your work frequently using the 'Push' and 'Pull Request' buttons at the bottom of your chatbox:  
    <img src="assets/images/readme-openhands-pushmerge.png">  

    i. Push: Do this after you are satisfied with every minor change done to your feature branch.  
    ii. Pull Request: Do this after you are satisfied with your entire feaure branch. You will have to head to your team's repository on Github, click on the 'Pull Request' tab, and approve your pull request to merge your feature branch into the 'main / master' branch. Refer to the 'Git / Github workflow' video under the ['Collaborating using Github'](#best-practices) section for more information on pull requests.
