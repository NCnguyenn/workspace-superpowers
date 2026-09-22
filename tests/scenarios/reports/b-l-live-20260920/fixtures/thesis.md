# Asynchronous Task Scheduling in Edge-Cloud Systems

## Chapter 1: Introduction

Modern edge-cloud environments process heterogeneous workloads with fluctuating arrival rates. This dissertation investigates two primary research questions:
- **RQ1:** Can speculative execution bound tail latency in edge clusters without exceeding memory thresholds?
- **RQ2:** What is the throughput trade-off when enforcing strict idempotency across distributed worker nodes?

### Scope and Boundaries
The scope of this investigation is confined to single-cluster edge environments with bounded local memory (maximum 4 GB per node). Distributed multi-region consensus and network partitioning across wide-area networks are explicitly excluded from this study.

### Core Terminology
- **Speculative Queue Execution (SQE):** A scheduling mechanism that preemptively allocates resources based on arrival-rate forecasting.
- **Idempotent Replay Buffer (IRB):** A localized memory-bounded log that filters duplicate task dispatches during retry cycles.

---

## Chapter 2: Literature Review

Traditional queueing systems rely on centralized dispatchers. Early implementations suffered from head-of-line blocking under burst conditions. Recent improvements have incorporated localized caching, but state synchronization overhead remains a critical bottleneck.

---

## Chapter 3: Architectural Design

The proposed system architecture integrates SQE with IRB. Producers enqueue tasks into a prioritized local buffer. Workers consume tasks and query the IRB before processing.

### Idempotency Contract
Each task carries a 64-bit deterministic hash. If a duplicate hash is observed within a 300-second window, the task is acknowledged without re-execution.

---

## Chapter 4: Empirical Evaluation

[Chapter in preparation. Requires empirical benchmark measurements comparing SQE against standard round-robin scheduling.]
