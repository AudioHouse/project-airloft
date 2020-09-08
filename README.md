# project-airloft
[![NPM Version](https://img.shields.io/npm/v/npm.svg?style=flat)]()
### Welcome! AirLoft is currently in development
Project AirLoft is a Platform as a Service (PaaS) that aims to make deploying applications in the cloud easy and straightforward. By providing a simple API, AirLoft obfuscates away the complexities of provisioning cloud resources. Under the hood, AirLoft will orchestrate VPCs, Subnets, Route Tables, Security Groups, Instances, Load Balancers, and more.

### Feature Roadmap
##### Release 0.1.0
- Create and manage Groups/Orgs
- Implement basic authentication using JWT
- Integration with Amazon Web Services (AWS)
	- Provide resource management in Default VPC
	- Create single-node applications
	- Provision EC2 instances and Classic Load Balancers
	- Support User-Data templates for EC2 deployment
	- Provision Lambda Functions with custom triggers
  - Limit resource consumption by tracking Group Quotas

##### Release 0.2.0
- Add more integration capabilities with AWS
	- Provide resource management with pre-existing VPC (non-default)
	- Provide option for AirLoft to provision completely new VPC
	- Consolidate EC2 instances behind single Application Load Balancer
	- Fully integrate with Route53 domain names for external Load Balancers
	- Provide Docker, Node, Java, and Python Templates for App Deployment
	- Provide Service-Templates for Kafka, Redis, Mongo, and more

### Why we chose JavaScript
AirLoft's backend architecture is written in JavaScript because it is inherently lightweight and extremely fast. In most cases, JavaScript is more than twice as fast as Python thanks to Node.js's powerful Chrome V8 engine. JavaScript is also a single-threaded language, and although that might seem like a disadvantage, it’s actually a benefit. Its event-based architecture allows it to execute code asynchronously to avoid blocking I/O and simulate a thread-like environment without the actual complexities of threading. A simple single-threaded runtime environment also permits Node.js to process more subsequent requests, thus improving application runtime performance.
