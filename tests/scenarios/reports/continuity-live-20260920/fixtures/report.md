# Evaluation of the Search Service

## 2.1 Evaluation setting

The evaluation concerns the catalogue search service used by the Northbridge
library. The baseline configuration and the indexed configuration were compared
on the same staging dataset of 12,000 catalogue records. The term indexed
configuration refers only to the addition of a covering index; it does not
describe a cache or a production deployment.

Both configurations were exercised with 20 concurrent clients for ten minutes.
Mean response time was 420 ms for the baseline configuration and 310 ms for the
indexed configuration. These observations indicate a lower mean response time
under the stated conditions. They do not establish an effect on tail latency
or on reader experience in the live library.

## 2.2 Interpretation and limitations

The comparison in Section 2.1 supports a bounded interpretation. The indexed
configuration reduced the observed mean response time in this staging run,
while the size of the collection and the fixed concurrency limit the conditions
to which the finding applies. No CPU measurements were collected, and the study
did not test repeated trials or production traffic.

## 2.3 Further evaluation

[To be written.]
