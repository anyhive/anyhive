# ⚡ Benchmarks

As an open-source product dedicated to solving complex global payment and tax challenges, delivering exceptional, stable performance and reliability is not just important—it's our mission.

You may have noticed that the core of Moneta Kit is built with Ruby on Rails, a framework that can scale from "Hello World" to IPO. Since Ruby's performance is not the best, we need to compare it with other frameworks to determine if it's the right choice.

The development philosophy of Moneta Kit is: prioritize developer experience first, then pursue maximum performance. Don't get me wrong—performance is not secondary. Our goal is for the development team and community to focus on creating a better user experience, and then, through software engineering techniques, ensure that we also achieve optimal performance.

For example, we know that modern languages like Go, Rust, and C++ offer the best performance. We choose to leverage the strengths of these languages in specific areas (hotspots), such as APIs related to transactions or complex computations.

Moneta Kit currently provides several core features:

1. Embedded UI and payment flows
2. Hosted checkout page & customer portal
3. Admin dashboard for administrators
4. API interface for third-party applications

The embedded UI is mainly provided through NPM packages. Each UI component calls APIs as needed, and, excluding network latency, should complete within 50ms.
