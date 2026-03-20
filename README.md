<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [BridgeFridge](#bridgefridge)
  - [Background](#background)
  - [The Three Code Repositories](#the-three-code-repositories)
    - [bridgefridge-ts-submodule](#bridgefridge-ts-submodule)
    - [bridgefridge-device](#bridgefridge-device)
      - [Web App](#web-app)
      - [Personal Device Mode](#personal-device-mode)
      - [Club Device Mode](#club-device-mode)
    - [bridgefridge-cloud](#bridgefridge-cloud)
  - [Identities and Environments](#identities-and-environments)
    - [AWS Subaccounts and Stages/Environments](#aws-subaccounts-and-stagesenvironments)
    - [AWS IAM Identity Center, SSO, and the CLI](#aws-iam-identity-center-sso-and-the-cli)
    - [Expected env vars for your CLI](#expected-env-vars-for-your-cli)
    - [bridgefridge-cloud and bridgefridge-device webapp deployments](#bridgefridge-cloud-and-bridgefridge-device-webapp-deployments)
  - [This submodule should be an NPM package](#this-submodule-should-be-an-npm-package)

<!-- TOC end -->

# ARCHIVED

This repository has been archived because timheilman/bridgefridge-device was converted to a monorepo and incorporated this repo as a package therein.

## BridgeFridge

### Background

In Portland, Oregon, USA there is a [duplicate bridge](https://en.wikipedia.org/wiki/Duplicate_bridge) [club](https://www.facebook.com/groups/394839073989383) run by a guy named Zack. It is not sanctioned by the [ACBL](https://acbl.org/) and Zack charges no dues – it's purely social and for-fun. I (Tim aka tdh) am a club member. Different club members take turns hosting the game at their homes.

Previously we used Google sheets and extensive macros that Zack had written in them to score the games. However, it was awkward and error-prone using Google Sheets to enter player identities and scores so I undertook this project to make things easier and less error-prone. We have been using BridgeFridge successfully to score our games since around May of 2024.

### The Three Code Repositories

The project is in three parts:

#### bridgefridge-ts-submodule

This TypeScript [git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules) is consumed by the two others. Code moves here when it is needed from both other repositories. The following documentation is presented here because parts of it apply to both other repositories.

#### bridgefridge-device

The [Expo app](https://github.com/timheilman/bridgefridge-device) is a React Native app that runs on iOS, Android, and the web. The app has two modes: "club device mode" and "personal device mode." Distribution of the device app is done using the Google Play Store, for now in "internal testing". Eventually generally-available distribution through the Google Play Store and Apple App Store is the target.

##### Web App

The web app is served at https://www.bridgefridge.com/ by the continuous integration/continuous deployment (CI/CD) facility provided by AWS Amplify Frontend Hosting. Although AWS Amplify also offers a backend hosting facility, we do not use it preferring instead to use the CDK framework as described in bridgefridge-cloud, below. The Web App serves personal device mode only.

##### Personal Device Mode

Authentication in this mode is performed using an email and password. The club admin (Zack) uses the Expo app in "personal device" mode, or on the web, to administer the game.

##### Club Device Mode

Club Device Mode is available only when the Expo app is running on a phone or tablet. Authentication in this mode is performed using OAuth 2.0 Device Authorization Flow, as registered by a club admin. Players use the Expo app in this mode to enter identities and scores.

#### bridgefridge-cloud

The [cloud backend](https://github.com/timheilman/bridgefridge-cloud) is built and deployed using the [AWS CDK](https://aws.amazon.com/cdk/) framework. It coordinates the different instances of bridgefridge-device on devices and on the web. It uses AWS AppSync, Cognito, DynamoDB, and Lambda, among other services. It is NOT hosted by the CI/CD facility provided by AWS Amplify Backend Hosting; instead it is hosted on AWS by the CDK framework.

### Identities and Environments

Two separate systems are used for identity management in this project. For the identities of developers on the project, we use the AWS IAM Identity Center. (For the identities of club admins and their club devices, we use AWS Cognito; see bridgefridge-cloud for more information.) Although this part regarding developer identities is a bear, it is the best practice currently recommended for AWS CDK projects.

#### AWS Subaccounts and Stages/Environments

Each "stage" or "environment" (these terms are synonymous) of bridgefridge-device (delivered as a webapp) and bridgefridge-cloud are hosted under differing AWS subaccounts of a root AWS account. (These AWS subaccounts can host multiple environments, but each environment is only within a single AWS subaccount.)

All this is done to provide isolation between environments. For example, the production environment for both bridgefridge-device as a webapp and bridgefridge-cloud is hosted under the prod subaccount; each developer's environment is hosted under the dev subaccount.

Each AWS subaccount is administered beneath a root AWS account, using AWS Organizations.

#### AWS IAM Identity Center, SSO, and the CLI

The AWS IAM Identity Center (previously known as AWS Single-Sign-On and still called `aws sso` on the AWS CLI) instance is associated with the root account of the project. The root account/subaccount relationship is managed in AWS Organizations. Permission sets provide differential access for those AWS IAM Identity Center accounts to each of the AWS subaccounts beneath the root account.

Each developer on the project needs an account in AWS IAM Identity Center. This is not the same as an IAM account. Instead, AWS IAM Identity Center acts as the Identity Provider (IdP) for IAM. As such, there is an [SSO signin URL for the bridgefridge Identity Center](https://d-92674207af.awsapps.com/start) that is separate from the general AWS signin page for AWS IAM (NOT-IdentityCenter) accounts.

Your AWS Identity Center account is the one that you use to [configure the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) for build, deployment, and testing of bridgefridge-device and bridgefridge-cloud. Once you have a profile in the AWS CLI configuration file for a particular env and permission set (using `aws configure sso`), you will need to update it with an extra line. Proceeding from here by example is probably clearest. The extra line begins with `credential_process` in the following example `~/.aws/config` file:

```
[profile BridgeFridge-dev-tdh-PowerUser-profile]
sso_session = BridgeFridge-sbc00-tdh-PowerUser-session
sso_account_id = 437893194722
sso_role_name = PowerUserAccess
region = us-west-2
output = json
credential_process = aws configure export-credentials --profile BridgeFridge-dev-tdh-PowerUser-profile
[sso-session BridgeFridge-dev-tdh-PowerUser-session]
sso_start_url = https://d-92674207af.awsapps.com/start
sso_region = us-west-2
sso_registration_scopes = sso:account:access
```

In this example profile and session, `dev` corresponds to the subaccount, and `tdh` corresponds to my own AWS IAM Identity Center account. Since each developer gets their own environment in the `dev` subaccount, `tdh` also refers to my environment. `PowerUser` corresponds to the AWS IAM Identity Center permissions set. `437893194722` is the AWS account number of the dev AWS subaccount that hosts the `tdh` environment. `https://d-92674207af.awsapps.com/start` is the SSO start URL provided by bridgefridge's root account AWS IAM Identity Center instance. `us-west-2` is the AWS region in which the environments are hosted.

#### Expected env vars for your CLI

Once you have an AWS SSO profile set up, this project expects these env vars to be set (staging and prod are optional but shown for completeness):

```zsh
export AWS_REGION=us-west-2
export STAGE=tdh
export BF_AWS_CLI_PROFILE_DEV=BridgeFridge-dev-tdh-PowerUser-profile
export BF_AWS_CLI_PROFILE_DNS=BridgeFridge-prod-tdh-PowerUser-profile
export BF_AWS_CLI_PROFILE_STAGING=BridgeFridge-staging-tdh-PowerUser-profile
export BF_AWS_CLI_PROFILE_PROD=BridgeFridge-prod-tdh-PowerUser-profile
```

This tells the build and test code in bridgefridge-cloud and bridgefridge-device which AWS SSO profile to use for the build, deploy, and test.

There are separate npm scripts for deployment of bridgefridge-cloud to an environment (specified with `STAGE`) in the `dev` subaccount, and for deployment of bridgefridge-cloud to the prod environment, wherein `STAGE` is overridden to `prod` regardless of the value of that env var in your shell.

For bridgefridge-device, Amplify Frontend Hosting CI in the `tdh` environment is set up to watch the branch named `tdh` and deploy it to `https://tdh.dev.bridgefridge.com` and similarly for other environments in the `dev` subaccount. Similarly, Amplify Frontend Hosting CI in the `prod` subaccount and environment watches the branch named `prod` to deploy to production at `https://www.bridgefridge.com`.

See the `package.json` file in bridgefridge-cloud for more information.

#### bridgefridge-cloud and bridgefridge-device webapp deployments

Once things are set up, a typical deployment and test of bridgefridge-cloud and bridgefridge-device in the `tdh` environment will look like this:

```
bridgefridge-cloud% npm run deployNonprod
bridgefridge-cloud% npm run test
bridgefridge-cloud% cd ../bridgefridge-device
bridgefridge-device% npm test
```

The cloud deploy will cause an amplify fe ci deployment of the `tdh` branch in bridgefridge-device as it exists in github. Once that is complete, these are the webapp tests:

```
bridgefridge-device% npm run cypress:run
```

To run the app on an android or iOS device or emulator:

```
bridgefridge-device% npm start
```

then launch a development build of the app and point it at the dev server. `npm start` provides a QR code that can be scanned by the development build of the app to make this easy.

### This submodule should be an NPM package

Ideally this submodule would be an NPM package. However, at this stage in development this repo is still so volatile that the overhead of publishing and consuming an NPM package is not worth it. When the repo stabilizes, it should be converted to an NPM package.
