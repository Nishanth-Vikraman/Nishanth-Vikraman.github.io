window.RESEARCH_DATA = {
  researcher: {
    name: "Nishanth Vikraman",
    tagline: "Independent experiments in computing, inference systems, physical computation and machine learning.",
    note: "I take technically strange hypotheses, reduce them to falsifiable experiments, and keep the receipts.",
    github: "https://github.com/Nishanth-Vikraman",
    email: "mailto:nishanth.vik@gmail.com"
  },
  // Theme anchors and visible label positions are percentages of the map.
  mapThemes: {
    systems:     { label: "SYSTEMS",     labelX: 8,  labelY: 4,  x: 20, y: 18 },
    computing:   { label: "COMPUTING",   labelX: 40, labelY: 4,  x: 55, y: 18 },
    physical:    { label: "PHYSICAL",    labelX: 75, labelY: 4,  x: 80, y: 35 },
    learning:    { label: "LEARNING",    labelX: 2,  labelY: 36, x: 23, y: 53 },
    sensing:     { label: "SENSING",     labelX: 88, labelY: 73, x: 80, y: 80 },
    markets:     { label: "MARKETS",     labelX: 8,  labelY: 95, x: 25, y: 84 },
    mathematics: { label: "MATHEMATICS", labelX: 48, labelY: 95, x: 60, y: 70 }
  },
  experiments: [
    {
      id: "EXP-017",
      artifacts: [{"label": "Research repository", "url": "https://github.com/Nishanth-Vikraman/exact-non-mac-inference"}, {"label": "RTL results", "url": "https://github.com/Nishanth-Vikraman/exact-non-mac-inference/blob/main/docs/rtl_results.md"}, {"label": "Experimental conclusions", "url": "https://github.com/Nishanth-Vikraman/exact-non-mac-inference/blob/main/docs/conclusions.md"}],
      slug: "exact-non-mac-inference",
      date: "OCT 2026",
      year: "2026",
      domain: "INFERENCE / SILICON",
      status: "ACTIVE",
      statusClass: "status-active",
      title: "Exact neural-network dot products without a conventional MAC",
      shortTitle: "Exact non-MAC inference",
      deck: "Testing whether unchanged INT4-weight × INT8-activation dot products can be expressed through non-trivial fixed-function arithmetic primitive.",
      result: "Arithmetic construction validated; physical throughput and silicon economics remain unmeasured.",
      metric: "0 / 4,040 exact dot-product failures",
      featured: true,
      wide: true,
      map: { artwork: "assets/map/017.svg", themes: { computing: 4, physical: 1 }, offset: { x: 8.000, y: -3.400 } },
      article: {
        question: "Can exact low-bit neural-network dot products be implemented using a fixed-function ASICs that was not designed as a neural-network MAC?",
        verdict: "ALGEBRA VALIDATED / SILICON TEST PENDING",
        intro: "The starting point was deliberately narrow: do not redesign the neural network, do not accept approximate arithmetic, and do not assume that a conventional multiply-accumulate datapath is the only physically sensible way to evaluate a dot product.",
        sections: [
          ["Why I tried this", "Modern inference hardware is optimized around highly regular low-bit matrix arithmetic, but a mature chip contains many other arithmetic structures whose manufacturing cost has already been amortized by enormous commodity markets. The experiment asks whether one of those structures can be repurposed exactly, not approximately, for arbitrary signed low-bit neural-network products."],
          ["Acceptance criterion", "The primary gate is bit-exactness. Every test must match a conventional reference dot product exactly. Throughput, area and cost are only interesting after arithmetic equivalence survives adversarial vectors."],
          ["What passed", "The current construction passed 4,040 exact dot-product tests spanning vector lengths from 16 through 1,024, and an additional randomized matvec campaign. This is evidence for the arithmetic identity and host-side construction, not yet evidence for end-to-end hardware advantage."],
          ["What remains unknown", "The decisive experiment is physical. The next stage must measure the target fixed-function unit on actual silicon, including invocation overhead, data movement, concurrency, saturation behavior, and whether the nominal arithmetic throughput survives the real programming path."],
          ["Current verdict", "Keep. The hypothesis has crossed the algebraic gate and is now waiting on a systems-and-silicon gate. A negative physical result would still be useful because it would identify exactly where the commodity block stops being competitive."]
        ]
      }
    },
    {
      id: "EXP-014",
      artifacts: [{"label": "Research repository", "url": "https://github.com/Nishanth-Vikraman/gamma-cim-research"}, {"label": "Architecture summary", "url": "https://github.com/Nishanth-Vikraman/gamma-cim-research/blob/main/docs/architecture_summary.md"}, {"label": "SKY130 results", "url": "https://github.com/Nishanth-Vikraman/gamma-cim-research/blob/main/docs/sky130_phase_results.md"}],
      slug: "gamma-cim",
      date: "OCT 2026",
      year: "2026",
      domain: "COMPUTE / CIRCUITS",
      status: "PARTIAL / REJECTED BRANCH",
      statusClass: "status-fail",
      title: "Gamma-CIM: exact arithmetic through redundant algebraic digits",
      shortTitle: "Gamma-CIM",
      deck: "A hardware arithmetic experiment built around β = 2 + √3, redundant digits, local rewrite identities and regenerative normalization.",
      result: "Behavioral arithmetic survived; an always-on 101-MOS normalization topology did not.",
      metric: "2,376 nonideal trials · 527 wrong-class events",
      featured: true,
      map: { artwork: "assets/map/014.svg", themes: { physical: 3, computing: 2, mathematics: 1 }, offset: { x: 15.667, y: 2.833 } },
      article: {
        question: "Can a redundant algebraic representation trade expensive conventional arithmetic for local state rewrites while remaining exact enough to compose across a dot product?",
        verdict: "BEHAVIORAL CORE INTERESTING / ALWAYS-ON NORMALIZER REJECTED",
        intro: "Gamma-CIM started from an algebraic identity rather than a transistor topology. The representation uses β = 2 + √3, for which 4β^k = β^(k−1) + β^(k+1). That allows certain over-range digit states to be rewritten locally into neighboring positions.",
        sections: [
          ["Representation", "The working digit alphabet was {-3,…,+3}. A seven-state equivalence detector and canonical regeneration stage attempted to keep the representation bounded while values propagated through repeated multiply-accumulate stages."],
          ["Behavioral results", "Sixty-six ideal main circuits passed across multiple storage mappings and connected-stage tests. Low-noise profiles regenerated successfully through deeper chains, while stress profiles accumulated classification failures."],
          ["The branch that died", "A fully always-on 101-MOS normalization topology measured roughly 4.219 pJ per input-to-rearm firing in the tested setup, with about 691.7 nW idle power per cell. PVT and mismatch robustness were poor. That branch was rejected instead of being cosmetically optimized around the failure."],
          ["Why keep the project", "The useful residue is the separation between the algebraic representation and the failed circuit realization. A dynamic or event-driven normalizer can still be evaluated independently, but only if it earns its energy and robustness at transistor level."],
          ["Current verdict", "The always-on topology is dead. The algebraic mechanism remains research-worthy only under a different normalization architecture and a much stricter physical energy budget."]
        ]
      }
    },
    {
      id: "EXP-013",
      artifacts: [{"label": "Research repository", "url": "https://github.com/Nishanth-Vikraman/perturbation-geometry-profiling"}, {"label": "Research note", "url": "https://github.com/Nishanth-Vikraman/perturbation-geometry-profiling/blob/main/docs/research_note.md"}, {"label": "Reported exploratory results", "url": "https://github.com/Nishanth-Vikraman/perturbation-geometry-profiling/blob/main/reported_results.json"}],
      slug: "perturbation-geometry-profiling",
      date: "OCT 2026",
      year: "2026",
      domain: "ML / INTERPRETABILITY",
      status: "SUCCESS",
      statusClass: "status-pass",
      title: "Perturbation geometry as a diagnostic for model–data fit",
      shortTitle: "Perturbation geometry",
      deck: "Testing whether finite perturbation maps can reveal the computational geometry a model actually uses, and distinguish an architecture aligned with the data from one merely capable of fitting it.",
      result: "Perturbation geometry separated model families and detected when a CNN's locality prior was aligned with image structure versus deliberately destroyed by pixel scrambling.",
      metric: "8.35× local interaction bias in CNN vs 0.92× after scrambling",
      featured: true,
      wide: true,
      map: { artwork: "assets/map/013.svg", themes: { learning: 4, mathematics: 1 }, offset: { x: -12.400, y: -8.400 } },
      article: {
        question: "Can the geometry of finite perturbation responses reveal whether a model architecture is naturally suited to a dataset, rather than merely achieving good test accuracy?",
        verdict: "STRONG PROOF OF CONCEPT / GENERALITY UNTESTED",
        intro: "The experiment treats a trained network as a perturbable computational system rather than trying to assign semantic meaning to individual neurons. First- and second-order finite perturbations are used to construct interaction maps, which are then compressed into quantities such as locality, interaction strength, effective response rank, redundancy and sample dependence. The initial test used the scikit-learn handwritten-digits dataset as a compact MNIST-like benchmark.",
        sections: [
          [
            "Why I tried this",
            "Validation accuracy alone cannot tell whether an architecture matches the structure of a problem or simply has enough capacity to fit it. The hypothesis was that a suitable architecture should develop a perturbation geometry that reflects the underlying structure of the data, while a mismatched architecture may solve the task through a more awkward or unstable computation."
          ],
          [
            "Controlled model comparison",
            "Five model families were trained on the same handwritten-digit task: a linear classifier, MLP, CNN, a CNN receiving a fixed random permutation of image pixels, and a small Vision Transformer. Test accuracy ranged from 92.7% for the linear model to 99.1% for the CNN. The scrambled CNN retained the same convolutional architecture but removed the meaningful relationship between convolutional neighborhoods and image-space locality."
          ],
          [
            "The clearest result",
            "Second-order pixel perturbations exposed a strong spatial signature in the normal CNN. Nearby pixel pairs interacted 8.35× more strongly than distant pairs, with interaction strength strongly decreasing with spatial distance (correlation -0.81). After scrambling the pixels, the same CNN architecture showed only a 0.92× nearby-to-distant ratio and essentially no distance dependence. The perturbation map therefore detected not just that the network was convolutional, but whether convolutional locality was actually useful for the task."
          ],
          [
            "Different models built different geometries",
            "Total pairwise interaction alone was insufficient: the CNN and scrambled CNN had similar normalized interaction magnitude, around 0.07, despite very different spatial organization. The Tiny Vision Transformer showed much stronger pair interaction, about 0.162, and its internal perturbation responses had an effective rank of 48.4 compared with 14.9 for the CNN and 12.7 for the MLP. Its response geometry was also far more sample-dependent, suggesting a higher-dimensional and more context-specific computation."
          ],
          [
            "Geometry predicted robustness",
            "The normal CNN, whose perturbation map strongly reflected spatial locality, was also the most robust to one-pixel translations: 55.2% shifted accuracy versus 44.2% for the scrambled CNN, 46.1% for the MLP and 44.8% for the Tiny Vision Transformer. With only 300 training examples, the CNN retained 94.4% clean accuracy and 50.3% shifted accuracy, while the scrambled CNN fell to 91.6% and 37.2%. This links the measured perturbation geometry to a functional generalization property rather than treating it as a purely descriptive fingerprint."
          ],
          [
            "Current interpretation",
            "The first result supports the hypothesis that architecture suitability is reflected in the geometry of perturbational interactions, not merely in their magnitude. A good model may be characterized by computational structure that matches the symmetries, locality and interaction patterns of the underlying problem. The next step is to test whether these signatures can be estimated from data before choosing a model, and whether the same framework can distinguish weak signal from architecture mismatch in noisy domains such as financial time series."
          ]
        ]
      }
    },    
    {
      id: "EXP-012",
      slug: "gpu-kernel-selector",
      date: "SEP–OCT 2026",
      year: "2026",
      domain: "GPU SYSTEMS",
      status: "REJECTED",
      statusClass: "status-fail",
      title: "How much hidden alpha is there in dynamic GPU kernel selection?",
      shortTitle: "GPU kernel selector",
      deck: "Measured whether workload structure was rich enough to justify a learned policy over inference kernels instead of a strong static choice.",
      result: "On the tested L4 campaign, the oracle itself was only 0.93% above the best static policy.",
      metric: "Static → oracle: 1.0093×",
      featured: true,
      map: { artwork: "assets/map/012.svg", themes: { systems: 2, computing: 2, learning: 1 }, offset: { x: 4.400, y: 4.000 } },
      article: {
        question: "Can a compact runtime policy materially outperform the best static decode-kernel choice across realistic workload states?",
        verdict: "LOW ORACLE ALPHA — REJECTED AS STANDALONE WEDGE",
        intro: "This project began with a tempting systems thesis: GPU inference workloads vary enough that a small structural policy should be able to choose a better kernel online. Before optimizing the predictor, I measured whether there was enough oracle advantage to predict at all.",
        sections: [
          ["Campaign", "The L4 experiment covered 192 states and six candidate policies over a broad decode workload sweep. Context length, batch size, GQA ratio, head dimension and paged-KV geometry were varied."],
          ["Result", "The best static policy was already extremely strong. The oracle improvement over that static choice was only 0.93%, while timing variability was of similar or larger scale. Bootstrap estimates kept the useful gap small."],
          ["Why this matters", "A sophisticated selector cannot recover value that the action set does not contain. Measuring oracle headroom first prevented a long detour into increasingly complex models whose maximum possible gain was already commercially weak on this hardware."],
          ["What survived", "The measurement tooling, workload-state representation and structural analysis remain useful for other kernel families or hardware generations. A100, H100 and L40S-class regimes were not ruled out by this result."],
          ["Current verdict", "Do not build a standalone company around this measured L4 kernel-selection wedge. Revisit only if a new platform exposes materially larger oracle spread."]
        ]
      }
    },
    {
      id: "EXP-011",
      artifacts: [{"label": "Research repository", "url": "https://github.com/Nishanth-Vikraman/iterative-functional-inference"}, {"label": "Source code", "url": "https://github.com/Nishanth-Vikraman/iterative-functional-inference/tree/main/ifi"}, {"label": "Publication notes", "url": "https://github.com/Nishanth-Vikraman/iterative-functional-inference/blob/main/PUBLICATION_NOTES.md"}],
      slug: "iterative-functional-inference",
      date: "SEP–OCT 2026",
      year: "2026",
      domain: "META-LEARNING / ADAPTATION",
      status: "HOLD",
      statusClass: "status-hold",
      title: "Learning an iterative adaptation rule from residuals, history and consequences",
      shortTitle: "Iterative Functional Inference",
      deck: "Testing whether a transformer can infer hidden task dynamics from interaction history, propose useful corrections on unseen systems, and iteratively improve without test-time gradient descent.",
      result: "History-conditioned correction generalized strongly to unseen hidden linear systems, but repeated rollout was not self-stabilizing. Oracle rejection preserved nearly all achieved improvement, isolating runtime consequence evaluation as the main remaining bottleneck.",
      metric: "F0 1.621 → F16 0.330; oracle-gated F128 0.407 vs 5.372 ungated",
      featured: true,
      wide: true,
      map: { artwork: "assets/map/011.svg", themes: { learning: 4, mathematics: 1, systems: 1 }, offset: { x: 13.333, y: 2.000 } },
      article: {
        question: "Can a learned inference procedure use residual errors and interaction history to identify an unseen system, choose corrective functional updates, and repeatedly improve without test-time gradient descent or explicit access to the hidden dynamics?",
        verdict: "ADAPTIVE CORRECTION VALIDATED / STABLE SELF-EVALUATION UNSOLVED",
        intro: "The project began as an attempt to learn the operation of learning itself rather than merely fit another task distribution. The central abstraction is a controller that observes the current residual and the history of previous interventions, then proposes the next functional correction. Later experiments removed teacher actions entirely and trained the controller only from the consequences of its own proposed updates.",
        sections: [
          [
            "Core formulation",
            "The learner receives a current residual R and an interaction history H, then proposes an action u = T(R,H). In the cleanest procedural benchmark, each episode hides a linear response law R_next = R + B u. B is never given to the transformer. The history therefore contains the only evidence from which the learner can infer how interventions affect the residual."
          ],
          [
            "What the controller learned",
            "Query-history attention produced genuine adaptive behavior. On held-out hidden systems, median residual fell from 1.621 initially to 0.357 at F8 and 0.330 at F16. A current-residual-only controller worsened to 1.683 at F8, while an autoregressive baseline without fresh residual evidence reached 0.729. Removing or replacing the correct history strongly degraded one-step performance, showing that the controller was using interaction history rather than only a global average policy."
          ],
          [
            "Generalization signal",
            "The learned controller was trained on short position-free histories yet remained useful when evaluated with much longer histories, and it continued to contract residuals on unseen members of the hidden-system family. This is evidence that the transformer learned a reusable history-conditioned system-identification-and-correction procedure rather than a fixed rollout script."
          ],
          [
            "Why long rollouts failed",
            "Repeated application eventually became unstable. Larger models and longer training delayed the failure but did not remove it: the strongest joint-trained model reached a best residual of 0.449 around F24, then drifted to 1.54 at F64 and 3.87 at F128. Diagnostics showed a persistent non-zero action floor and, more importantly, late correction directions flipping from useful to strongly harmful."
          ],
          [
            "Runtime acceptance experiment",
            "A decisive oracle experiment evaluated each proposed action before execution using the true next-step contraction ratio. The frozen controller alone ended at F128 = 5.372, while oracle rejection ended at 0.407 and preserved the best reached residual exactly. This showed that the proposal policy already contained useful corrections; the catastrophic failure came primarily from continuing to execute bad late proposals."
          ],
          [
            "Learned critic and world-model attempts",
            "A scalar critic Q(R,H,u) learned substantial but insufficient information about action quality: held-out AUROC reached 0.882, but false-safe errors remained 28.3%, making it unsafe for repeated gating. A subsequent residual world model W(R,H,u) → ΔR also failed at the 2,000-step smoke gate. An empirical least-squares estimator recovered the hidden linear response almost perfectly from the same histories, proving that the information was present but the generic attention model had not learned the required system-identification computation."
          ],
          [
            "Current interpretation",
            "The strongest result is not a universal learner yet. It is a learned, history-conditioned adaptive correction mechanism that generalizes to unseen hidden systems and substantially outperforms current-only and autoregressive controls. The unresolved problem is reliable consequence modelling and termination: deciding whether a proposed update should actually be executed. The next architectural direction is to separate proposal generation from task-invariant residual-dynamics inference and runtime verification."
          ]
        ]
      }
    },
    {
      id: "EXP-010",
      artifacts: [{"label": "Research repository", "url": "https://github.com/Nishanth-Vikraman/proofplane-research"}, {"label": "Third-party benchmark note", "url": "https://github.com/Nishanth-Vikraman/proofplane-research/blob/main/PUBLICATION_NOTES.md"}],
      slug: "proofplane",
      date: "AUG–SEP 2026",
      year: "2026",
      domain: "ML / SOFTWARE REPAIR",
      status: "MIXED",
      statusClass: "status-active",
      title: "Learning structural transitions in real software bugs",
      shortTitle: "Proofplane",
      deck: "A sequence of leak-safe experiments on whether bug-fix structure can be ranked from code context rather than memorized project identity.",
      result: "Forward transition signal survived; an inverse-ranking branch collapsed after leakage correction.",
      metric: "Forward MRR: 0.468 ± 0.025",
      featured: true,
      map: { artwork: "assets/map/010.svg", themes: { learning: 4, systems: 1 }, offset: { x: -3.400, y: 23.000 } },
      article: {
        question: "Is there reusable structural signal in how real bugs transition into fixes, after controlling for project identity and answer leakage?",
        verdict: "FORWARD SIGNAL SURVIVED / INVERSE BRANCH REJECTED",
        intro: "Proofplane was less about building another code model and more about designing a fair test. The central risk was that a model could appear to understand bug transitions while quietly exploiting project identity, lexical overlap or answer-centering artifacts.",
        sections: [
          ["Forward experiment", "On a project-disjoint split of real BugsInPy edits, the forward transition model reached an MRR around 0.468 with Top-1 around 0.281, above the corresponding baseline. The split was designed so the easiest project-specific shortcuts were unavailable."],
          ["The misleading branch", "An inverse-ranking experiment initially looked promising. After tightening the evaluation and correcting answer-centering leakage, that apparent gain disappeared and the branch fell below baseline."],
          ["Research lesson", "The interesting output was not just the surviving metric. It was the discovery that the evaluation itself contained a shortcut. Preserving that failure makes future work safer because the next model must beat a stricter protocol."],
          ["Current verdict", "There is evidence of forward structural signal worth studying. The inverse formulation tested here should not be trusted without a redesigned task and stronger leakage controls."]
        ]
      }
    },
    {
      id: "EXP-009",
      artifacts: [{"label": "Study and findings", "url": "https://github.com/Nishanth-Vikraman/eth-orderbook-continuation"}, {"label": "Replication summary", "url": "https://github.com/Nishanth-Vikraman/eth-orderbook-continuation/blob/main/results/replication_summary.csv"}],
      slug: "eth-l2-continuation",
      date: "AUG–OCT 2026",
      year: "2026",
      domain: "MARKET MICROSTRUCTURE",
      status: "REPLICATED / LIMITED",
      statusClass: "status-pass",
      title: "Does ETH order-book state predict medium-horizon continuation?",
      shortTitle: "ETH L2 continuation",
      deck: "A narrow market-microstructure study that kept one directional effect, reproduced it externally, and rejected the same protocol on BTC.",
      result: "External ETH replication remained positive after a 10 bp cost assumption; BTC did not.",
      metric: "+6.78 bp/trade net on external cohort",
      featured: true,
      map: { artwork: "assets/map/009.svg", themes: { markets: 5, learning: 1 }, offset: { x: 10.333, y: 5.167 } },
      article: {
        question: "After a short-horizon order-book event, is there enough state information to select a subset of ETH continuation trades with positive medium-horizon expectancy?",
        verdict: "REPLICATED ON ETH / NOT GENERAL ACROSS BTC",
        intro: "The goal was not to discover a universal trading strategy. It was to test one narrow effect with an explicit transaction-cost assumption, then attempt to break it on external historical data and another asset.",
        sections: [
          ["Initial signal", "The first ETH L2 campaign selected only the highest-confidence continuation events and measured a positive average return after a 10 bp cost assumption."],
          ["External replication", "A separate Tardis historical cohort produced 270 qualifying events and 67 selected trades. Average gross return was about 16.78 bp per selected trade and about 6.78 bp net under the same 10 bp cost assumption, with five of six sampled days positive."],
          ["Cross-asset failure", "Running the same protocol on BTC did not preserve the edge. That matters: the effect appears conditional on market and sampling regime rather than being a generic order-book law."],
          ["Current verdict", "Interesting empirical anomaly, not a business yet. Live execution quality, fees, slippage, regime stability and larger out-of-sample windows dominate the next decision."]
        ]
      }
    },
    {
      id: "EXP-008",
      artifacts: [{"label": "Nix Series repository", "url": "https://github.com/Nishanth-Vikraman/nix-series"}, {"label": "Working paper (PDF)", "url": "https://github.com/Nishanth-Vikraman/nix-series/blob/main/nix_series_paper.pdf"}],
      slug: "nix-series",
      date: "FEB 2026",
      year: "2026",
      domain: "MATHEMATICS / NONLINEAR SYSTEMS",
      status: "ACTIVE",
      statusClass: "status-active",
      title: "Nix Series: combinatorial spectral dynamics for nonlinear systems",
      shortTitle: "Nix Series",
      deck: "Testing whether nonlinear frequency interactions can be represented as a sparse combinatorial spectral expansion whose generated frequencies and interaction tensors enable prediction, inversion and reduced-order simulation.",
      result: "Formal operator constructed and synthetic validation is promising: sparse combinatorial interaction terms substantially improved nonlinear modal prediction and reduced-order plasma rollouts versus linear spectral baselines.",
      metric: "HW rollout NRMSE: 0.0369 Nix vs 1.038 linear",
      featured: false,
      wide: true,
      map: { artwork: "assets/map/008.svg", themes: { mathematics: 5, physical: 1 }, offset: { x: -1.333, y: 1.833 } },
      article: {
        question: "Can nonlinear systems be represented in an expanded spectral basis where frequencies generated by sums, differences and higher-order combinations are treated explicitly as structured interaction states rather than unmodelled distortion?",
        verdict: "FORMALISM CONSTRUCTED / REDUCED-ORDER SIGNAL VALIDATED / PHYSICAL GENERALITY UNPROVEN",
        intro: "The idea emerged from debugging a wave-based analog computer. Fourier analysis identified the frequencies present in the measured signal, but did not directly express how simultaneous frequencies contributed through nonlinear mixing to newly generated spectral components. The resulting hypothesis was to treat nonlinear spectral evolution as a combinatorial expansion: base frequencies generate a larger closure of sum, difference and higher-order interaction frequencies, with amplitudes governed by order-specific interaction tensors.",
        sections: [
          [
            "Core construction",
            "Given a base frequency set F, the Nix construction expands it into a finite spectral closure containing combinations such as fi+fj, |fi-fj| and higher-order integer combinations. Output amplitudes are represented by a graded series of linear, quadratic, cubic and higher-order interaction tensors. Unlike an ordinary tensor map over a fixed index set, the output basis itself grows through combinatorial frequency generation."
          ],
          [
            "Why it may be useful",
            "The useful hypothesis is not merely that nonlinear systems generate harmonics and intermodulation products; that is already established physics. The question is whether explicitly organizing those interactions into a sparse combinatorial basis gives a computationally useful reduced representation for prediction, inversion, calibration and simulation."
          ],
          [
            "Synthetic validation",
            "Initial synthetic experiments compared truncated Nix models against linear spectral surrogates and full nonlinear integrations. In a weakly nonlinear modal system, the Nix model reached one-step NRMSE of 3.48e-08 versus 5.90e-05 for the linear model, and 180-step rollout NRMSE of 3.07e-06 versus 4.79e-03. Runtime was approximately 3.5x faster than the full numerical integration in the unoptimized Python test."
          ],
          [
            "Plasma test",
            "A second experiment used a coarse Hasegawa-Wakatani-style pseudo-spectral plasma simulation and learned sparse triadic interactions satisfying spectral combination rules. On held-out 200-step rollouts, the Nix reduced-order model achieved state NRMSE of 0.0369 versus 1.038 for a linear spectral ROM, and low-mode energy NRMSE of 0.00874 versus 0.987. The Nix rollout remained faster than the full pseudo-spectral solver, although slower than the linear ROM."
          ],
          [
            "Inverse Nix",
            "The forward representation naturally suggests an inverse problem: infer clean source amplitudes, remove nonlinear contamination, or determine an input that produces a desired spectrum. Candidate approaches include formal series reversion in the weakly nonlinear regime, damped Gauss-Newton inversion of a truncated forward model, and sparse hypergraph peeling when only a small set of combinatorial interactions is active."
          ],
          [
            "Potential domains",
            "Candidate applications include analog-compute calibration, nonlinear RF equalization, acoustic and ultrasonic systems, nonlinear photonics, reduced-order plasma dynamics, system identification and nonlinear spectral signal processing. Machine-learning applications are possible through learnable spectral-interaction layers, but no ML advantage has yet been demonstrated."
          ],
          [
            "What remains unknown",
            "The present evidence does not establish that Nix is a fundamentally new mathematical class, that it outperforms established nonlinear formalisms such as Volterra methods in general, or that the plasma result transfers to reactor-grade gyrokinetic or kinetic simulations. The next decisive tests are comparisons against stronger nonlinear reduced-order baselines, identification of sparsity or scaling laws in real physical systems, and validation on measured nonlinear spectral data."
          ],
          [
            "Current verdict",
            "Keep and deepen. The representation has moved beyond a naming exercise: it has a precise combinatorial spectral definition, an inverse formulation, and two synthetic computational demonstrations where explicit nonlinear interaction structure materially improved prediction. Its highest-value near-term role is as a modeling and calibration layer for wave-based analog computing, with plasma and communications as independent falsification domains."
          ]
        ]
      }
    },
    {
      id: "EXP-006",
      artifacts: [{"label": "WPU repository", "url": "https://github.com/Nishanth-Vikraman/wpu"}, {"label": "Prototype source", "url": "https://github.com/Nishanth-Vikraman/wpu/tree/main/research/v0"}],
      slug: "wpu-physical-compute",
      date: "2025–2026",
      year: "2025",
      domain: "PHYSICAL COMPUTE",
      status: "ARCHIVE",
      statusClass: "status-active",
      title: "WPU: matrix operations through frequency-domain physical superposition",
      shortTitle: "WPU physical compute",
      deck: "Exploratory work using driven physical modes, frequency-space encoding and demodulation as a computational substrate.",
      result: "Useful as a physical-compute research branch; not positioned here as a production accelerator.",
      metric: "Physical experiment archive",
      featured: false,
      map: { artwork: "assets/map/006.svg", themes: { physical: 4, computing: 2, mathematics: 1 }, offset: { x: 14.000, y: 25.857 } },
      article: {
        question: "Can a driven physical system use frequency multiplexing and superposition to carry out useful linear operations before digitization?",
        verdict: "EXPLORATORY ARCHIVE",
        intro: "WPU was an early attempt to treat the physical medium itself as part of the compute graph. Inputs were encoded into driven modes, allowed to superpose, and then separated through lock-in style demodulation.",
        sections: [
          ["Why it mattered", "The project forced a useful distinction between mathematical parallelism and physically accessible parallelism. A medium may superpose many components, but coupling, readout bandwidth, calibration and signal-to-noise determine whether that superposition is computationally valuable."],
          ["What survived", "The experiment became a durable reference point for later work on nonconventional arithmetic: always identify the readout tax, calibration tax and state-restoration tax before celebrating the primitive itself."],
          ["Current verdict", "Archived as physical-compute research. Revisit only if a later architecture can amortize readout and calibration over a sufficiently large useful operation."]
        ]
      }
    },
    {
      id: "EXP-016",
      slug: "theiran-switch-fabric",
      date: "OCT 2026",
      year: "2026",
      domain: "DATACENTER SYSTEMS",
      status: "ACTIVE",
      statusClass: "status-active",
      title: "Theiran: moving inference routing decisions into the switch fabric",
      shortTitle: "Theiran",
      deck: "A datacenter systems thesis around KV-aware, load-aware inference routing at the programmable switch layer while keeping software as the slow control path.",
      result: "Architecture thesis active; requires datacenter-adjacent validation and hardware access.",
      metric: "Control-plane / data-plane split",
      featured: false,
      map: { artwork: "assets/map/016.svg", themes: { systems: 4, computing: 1 }, offset: { x: -11.000, y: 0.000 } },
      article: {
        question: "Can a programmable switch make the common-case inference routing decision early enough to reduce dispatch overhead without replacing the authoritative software scheduler?",
        verdict: "ACTIVE / EXTERNAL VALIDATION REQUIRED",
        intro: "Theiran treats the switch not as a replacement for the LLM scheduler, but as a fast data-plane stage. Eligibility and routing hints can be maintained by a slower control path while the common case is decided close to packet ingress.",
        sections: [
          ["Boundary", "The thesis is intentionally narrower than general in-network AI. The interesting wedge is request routing using KV eligibility, worker load and live fabric state. East-west KV movement is not claimed as the core novelty."],
          ["Main unknown", "The architecture only matters if the existing scheduler and network path contain enough latency or coordination overhead to justify moving a common-case decision into the switch. That requires real deployment traces and datacenter-adjacent collaborators."],
          ["Current verdict", "Technically plausible and commercially interesting, but blocked on external validation more than local implementation. The next useful artifact is a trace-backed latency model or a hardware-in-loop prototype."]
        ]
      }
    },
    {
      id: "EXP-015",
      slug: "alai-dynamics",
      date: "OCT 2026",
      year: "2026",
      domain: "SENSING / INDUSTRIAL",
      status: "THESIS",
      statusClass: "status-active",
      title: "Alai Dynamics: active interrogation of fluid networks",
      shortTitle: "Alai Dynamics",
      deck: "A diagnostic concept using deliberately injected hydraulic/acoustic perturbations to build a network model and localize faults faster than passive monitoring.",
      result: "Concept-stage systems thesis; field instrumentation and customer data still required.",
      metric: "Active experiment → digital twin → diagnosis",
      featured: false,
      map: { artwork: "assets/map/015.svg", themes: { sensing: 5, physical: 1, systems: 1 }, offset: { x: 5.571, y: 19.286 } },
      article: {
        question: "Can a fluid network be diagnosed faster by actively perturbing it and learning its response than by waiting for naturally occurring telemetry?",
        verdict: "CONCEPT / FIELD TEST REQUIRED",
        intro: "The central idea is borrowed from system identification: stop treating the network as a passive object to monitor and deliberately excite it with safe, controlled perturbations that maximize diagnostic information.",
        sections: [
          ["System concept", "A small set of actuators and pressure/acoustic sensors would inject designed disturbances, observe transient responses, fit or update a digital twin, and choose the next excitation based on uncertainty."],
          ["Commercial hypothesis", "The wedge is not a generic digital twin. It is rapid diagnosis: leak localization, blockage identification, valve-state inference or topology discovery where downtime or manual inspection is expensive."],
          ["Current verdict", "Promising enough for customer discovery, but not yet validated. The next experiment needs a benchtop or real-network loop with controlled faults and a baseline against passive sensing."]
        ]
      }
    }
  ],
  links: [
    ["EXP-012", "EXP-017", "solid"],
    ["EXP-014", "EXP-017", "solid"],
    ["EXP-006", "EXP-014", "dashed"],
    ["EXP-010", "EXP-012", "dashed"],
    ["EXP-016", "EXP-012", "solid"],
    ["EXP-015", "EXP-006", "dashed"]
  ]
};
