<div align="center">
  <img src="https://i.ibb.co/P4wgv99/t-l-chargement.png" height="120" width="100">
  <br />
  <a href="https://github.com/kasarlabs/starkcet/issues/new?assignees=&labels=bug&template=01_BUG_REPORT.md&title=bug%3A+">Report a Bug</a>
  ·
  <a href="https://github.com/kasarlabs/starkcet/issues/new?assignees=&labels=enhancement&template=02_FEATURE_REQUEST.md&title=feat%3A+">Request a Feature</a>
  ·
  <a href="https://github.com/kasarlabs/starkcet/discussions">Ask a Question</a>
</div>

<div align="center">
<br />

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/kasarlabs/starkcet/ci.yml?branch=main)
[![Project license](https://img.shields.io/github/license/kasarlabs/starkcet.svg?style=flat-square)](LICENSE)
[![Pull Requests welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](https://github.com/kasarlabs/starkcet/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)

</div>

# Starkcet

This repo contains the infra of [Starkcet](https://starkcet.com) a Geth anti-flood faucet at the disposal of the developers of the Starknet network. The purpose of this faucet is to never run out of tokens and to avoid any attack without going through sybil cencorship centralized verification. It works by providing a fraction of Tokens accessible only via an L1 verification invoquing gaz costs.

## 💻 System

The faucet works in 4 simple steps as follows

<div align="center">
  <img src="https://i.ibb.co/tMvxHnX/starkcet-Schema.png" height="300" width="500">
</div>

- (1) A transaction is sent to a smart contract deployed on the L1 invoquing gaz costs for the user
- (2) It will then trigger an event to the faucet if the verification went well
- (3) The faucet will then send the goerli tokens to the corresponding L2 address
- (4) finaly once the transaction is successful the user will be notified 

## 🌐 Contact us

This is a [KasarLabs](https://twitter.com/kasarlabs) project If you need any help about Starkcet or anything else related to Starknet please feel free to open an issue or contact us via telegram [here](https://t.me/antiyro).

<p align="center">
  <img src="https://i.ibb.co/zrmG8Ys/logo-kasar-1.png" alt="Sublime's custom image" height="70" width="70"/>
</p>