/* --- INITIAL STATE & LOGIC --- */
document.addEventListener("DOMContentLoaded", () => {
  initThemeMode();
  initTypewriter();
  initMobileMenu();
  initSkillsProgress();
  initProjectsFilter();
  initProjectsModal();
  initResearchSandbox();
  initContactForm();
  initVisitorCounter();
  initAIChatbot();
});

/* --- LIGHT / DARK MODE TOGGLE --- */
function initThemeMode() {
  const modeBtn = document.getElementById("themeModeBtn");
  
  // Set default or load saved mode
  const savedMode = localStorage.getItem("portfolio-mode") || "light";
  setMode(savedMode);

  modeBtn.addEventListener("click", () => {
    const currentMode = document.body.getAttribute("data-mode");
    const targetMode = currentMode === "light" ? "dark" : "light";
    setMode(targetMode);
  });
}

function setMode(mode) {
  document.body.setAttribute("data-mode", mode);
  localStorage.setItem("portfolio-mode", mode);
  
  // Update toggle button icon
  const modeBtn = document.getElementById("themeModeBtn");
  const icon = modeBtn.querySelector("i");
  if (mode === "dark") {
    icon.className = "fa-solid fa-sun";
    modeBtn.setAttribute("title", "Toggle Light Mode");
  } else {
    icon.className = "fa-solid fa-moon";
    modeBtn.setAttribute("title", "Toggle Dark Mode");
  }
}



/* --- MOBILE NAVIGATION MENU --- */
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-links a");
  const header = document.getElementById("header");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const icon = menuToggle.querySelector("i");
    if (navMenu.classList.contains("active")) {
      icon.className = "fa-solid fa-xmark";
    } else {
      icon.className = "fa-solid fa-bars";
    }
  });

  // Close menu on clicking navigation links
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.querySelector("i").className = "fa-solid fa-bars";
    });
  });

  // Shrink header on scroll & active links spying
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    spyScroll();
  });
}

// Scrollspy logic
function spyScroll() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");
  let scrollPos = window.scrollY || document.documentElement.scrollTop || 0;

  sections.forEach(section => {
    // Add offset for sticky header height
    if (scrollPos >= (section.offsetTop - 130) && scrollPos < (section.offsetTop + section.offsetHeight - 130)) {
      const id = section.getAttribute("id");
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

/* --- HERO TYPEWRITER ANIMATION --- */
function initTypewriter() {
  const words = ["AI Researcher", "ML Engineer", "Agentic AI Architect", "Data Engineer"];
  const typewriterSpan = document.getElementById("typewriter");
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIdx];
    
    if (isDeleting) {
      typewriterSpan.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50; // faster deleting
    } else {
      typewriterSpan.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 120; // normal typing
    }

    if (!isDeleting && charIdx === currentWord.length) {
      // Pause at full word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      typingSpeed = 500; // brief pause before next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --- SKILLS PROGRESS BAR ANIMATION --- */
function initSkillsProgress() {
  const progressBars = document.querySelectorAll(".skill-bar-fill");
  const skillsSection = document.getElementById("skills");

  if (!skillsSection) return;

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const targetWidth = bar.getAttribute("data-percent");
          bar.style.width = targetWidth;
        });
        observerInstance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  observer.observe(skillsSection);
}

/* --- PROJECTS FILTER LOGIC --- */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll("[data-filter]");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active states
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue || (filterValue === "healthcare" && category === "healthcare")) {
          card.style.display = "flex";
          // Animation trigger
          card.style.animation = "fadeIn 0.4s ease-out forwards";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* --- PROJECTS MODAL DATA & CONTROLS --- */
const projectsData = {
  mentalhealth: {
    title: "MentalHealth NeuralMesh",
    tags: ["MERN Stack", "LangChain", "Genetic Algorithms", "React"],
    desc1: "Architected an autonomous healthcare platform utilizing LangChain and Generative AI to deploy self-learning wellness agents. The system provides immediate, personalized therapeutic dialogue and mood intervention exercises based on real-time user diagnostics.",
    desc2: "Engineered multi-modal machine learning models to identify biometric patterns and physiological markers like stress profiles. Decision nodes are optimized dynamically utilizing customized Genetic Algorithms, resulting in adaptive support paths that evolve relative to long-term patient telemetry.",
    keyPoints: [
      "Designed and deployed self-learning health agents that respond autonomously in multi-turn dialogues.",
      "Engineered stress-level and mood state detection modules analyzing physiological metrics.",
      "Utilized custom Genetic Algorithms to select highly optimized reasoning chains inside LLM pipelines.",
      "Integrated React client dashboards with secure, real-time consultation logging pipelines."
    ],
    tech: ["LangChain", "Genetic Algorithms", "React", "Express.js", "Node.js", "MongoDB", "Python", "Scikit-Learn"],
    github: "https://github.com/vanimalhotra22/MentalHealth-NeuralMesh.git",
    live: "https://mental-health-neural-mesh.vercel.app"
  },
  hyperlocal: {
    title: "Hyperlocal Service Platform",
    tags: ["MERN Stack", "Geospatial Indexing", "Vendor Ranking", "Node.js"],
    desc1: "Built a fully-featured, end-to-end service discovery system mapping consumers to localized professionals. It features secure customer accounts, vendor admin portals, and analytics modules.",
    desc2: "Engineered a custom vendor ranking pipeline leveraging MongoDB aggregation. This ranks service providers dynamically using fulfillment history, customer feedback, and booking responsiveness. Optimized geospatial query filters, shortening searches to confirm transactions 80% faster.",
    keyPoints: [
      "Structured geospatial index queries using MongoDB 2dsphere mapping for immediate vendor matches.",
      "Engineered automated scheduling pipelines for customer booking states and admin analytics.",
      "Implemented a backend performance scoring engine utilizing historical analytics and reviews.",
      "Ensured maximum mobile and desktop responsive views with TailwindCSS grid systems."
    ],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Geospatial Indexes", "TailwindCSS", "Mapbox API"],
    github: "https://github.com/vanimalhotra22/hyperlocal.git",
    live: "https://hyperlocal-rrjs.vercel.app"
  },
  uhlis: {
    title: "UHLIS Healthcare Platform",
    tags: ["Agentic AI", "Computer Vision", "LangChain", "MERN Stack"],
    desc1: "Deployed Agentic AI workflows to synchronize medical consultations, diagnostic scheduling, and automated pharmaceutical supply chain tracking across healthcare complexes.",
    desc2: "Implemented advanced Computer Vision models to flag anomalies in chest X-rays and MRI scans, decreasing diagnostic queue delays. Built a donor network utilizing predictive modeling to forecast resource needs and blood bank availability dynamically.",
    keyPoints: [
      "Constructed autonomous clinical appointment routers based on patient biometric queries.",
      "Trained CNN models to recognize anomaly signs in medical scans, routing priority reports to doctors.",
      "Developed a real-time tracking network for critical ICU support materials and blood stocks.",
      "Utilized LangChain and Python predictive analytics pipelines inside a unified MERN environment."
    ],
    tech: ["Agentic AI", "Computer Vision", "LangChain", "React", "Node.js", "Express", "MongoDB", "TensorFlow"],
    github: "https://github.com/vanimalhotra22/UHLIS-Healthcare.git",
    live: "https://uhlis-healthcare-8ecu.vercel.app"
  },
  smartagro: {
    title: "SmartAgro Precision Platform",
    tags: ["React", "Flask", "TensorFlow / CNN", "Scikit-learn"],
    desc1: "Engineered an intelligent precision agriculture platform leveraging CNN image classifiers and TensorFlow to automate plant crop infection diagnostic scanning.",
    desc2: "Features a bilingual English/Hindi portal communicating crop advice, irrigation planning, and fertilizer selections based on local weather forecasts. Configured as a Progressive Web App (PWA) with client-side caching to remain fully operational in remote areas with poor data connectivity.",
    keyPoints: [
      "Trained Convolutional Neural Networks (CNNs) in TensorFlow to detect 15+ plant leaf disease states.",
      "Built Flask microservices to serve low-latency prediction endpoints to the React front-end.",
      "Configured offline PWA caching service workers to handle connectivity loss in rural agricultural environments.",
      "Integrated Scikit-Learn models for predictive watering, schedules, and seed recommendations."
    ],
    tech: ["React", "Flask", "TensorFlow", "Scikit-Learn", "CNN", "PWA Service Workers", "TailwindCSS"],
    github: "https://github.com/vanimalhotra22/SmartWeather.git",
    live: "https://smart-weather-sage.vercel.app"
  }
};

function initProjectsModal() {
  const modal = document.getElementById("projectModal");
  const closeBtn = document.getElementById("modalCloseBtn");
  const detailButtons = document.querySelectorAll(".proj-details-btn");

  const modalTitle = document.getElementById("modalTitle");
  const modalTags = document.getElementById("modalTags");
  const modalDesc1 = document.getElementById("modalDesc1");
  const modalDesc2 = document.getElementById("modalDesc2");
  const modalKeyPoints = document.getElementById("modalKeyPoints");
  const modalSidebarTech = document.getElementById("modalSidebarTech");
  const modalGithubLink = document.getElementById("modalGithubLink");
  const modalLiveLink = document.getElementById("modalLiveLink");

  detailButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const projId = btn.getAttribute("data-project");
      const data = projectsData[projId];

      if (!data) return;

      // Populate Modal Fields
      modalTitle.textContent = data.title;
      
      // Clean previous items
      modalTags.innerHTML = "";
      data.tags.forEach(t => {
        modalTags.innerHTML += `<span class="tag">${t}</span>`;
      });

      modalDesc1.textContent = data.desc1;
      modalDesc2.textContent = data.desc2;

      modalKeyPoints.innerHTML = "";
      data.keyPoints.forEach(kp => {
        modalKeyPoints.innerHTML += `<li>${kp}</li>`;
      });

      modalSidebarTech.innerHTML = "";
      data.tech.forEach(t => {
        modalSidebarTech.innerHTML += `<span class="tag">${t}</span>`;
      });

      modalGithubLink.href = data.github;
      modalLiveLink.href = data.live;

      // Open Modal
      modal.style.display = "flex";
      setTimeout(() => {
        modal.classList.add("show");
      }, 10);
    });
  });

  // Close Modal Events
  const closeModal = () => {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
  };

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

/* --- RESEARCH PAPERS & INTERACTIVE MODEL SANDBOX --- */
function initResearchSandbox() {
  // 1. Paper Abstract Expandables
  const btnAbstracts = document.querySelectorAll(".btn-abstract");
  
  btnAbstracts.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-toggle");
      const target = document.getElementById(targetId);
      
      target.classList.toggle("open");
      btn.classList.toggle("active");
      
      if (target.classList.contains("open")) {
        btn.innerHTML = `Hide Abstract <i class="fa-solid fa-chevron-up"></i>`;
      } else {
        btn.innerHTML = `Read Abstract <i class="fa-solid fa-chevron-down"></i>`;
      }
    });
  });

  // 2. Model Analytics Sandbox Logic
  const modelSelect = document.getElementById("sandboxModel");
  const sliderConf = document.getElementById("sliderConf");
  const sliderIou = document.getElementById("sliderIou");
  const sliderAug = document.getElementById("sliderAug");
  
  const confValText = document.getElementById("confVal");
  const iouValText = document.getElementById("iouVal");
  const augValText = document.getElementById("augVal");
  
  const valMap = document.getElementById("valMap");
  const valFps = document.getElementById("valFps");
  const valPrecision = document.getElementById("valPrecision");
  const valRecall = document.getElementById("valRecall");
  const valLatency = document.getElementById("valLatency");
  
  const ringMap = document.getElementById("ringMap");
  const ringFps = document.getElementById("ringFps");
  
  const accuracyLabel = document.getElementById("accuracyLabel");
  const latencyLabel = document.getElementById("latencyLabel");

  // Base metrics by model architecture
  const modelSpecs = {
    yolo: {
      name: "YOLOv8 + ResfEANet",
      accuracyName: "mAP Score",
      fpsName: "Inference Rate (FPS)",
      baseMap: 75,
      baseFps: 45,
      basePrecision: 82.4,
      baseRecall: 78.1,
      baseLatency: 22.2,
      maxFps: 100
    },
    medical: {
      name: "Clinical Anomaly CNN",
      accuracyName: "Test Accuracy",
      fpsName: "Inference Rate (FPS)",
      baseMap: 87,
      baseFps: 30,
      basePrecision: 89.2,
      baseRecall: 85.5,
      baseLatency: 33.3,
      maxFps: 60
    },
    agent: {
      name: "LangChain Agent Router",
      accuracyName: "Route Precision",
      fpsName: "Generation Speed",
      baseMap: 91,
      baseFps: 80,
      basePrecision: 93.5,
      baseRecall: 90.2,
      baseLatency: 450.0,
      maxFps: 150 // represents tokens/sec
    }
  };

  function updateSandbox() {
    const modelKey = modelSelect.value;
    const spec = modelSpecs[modelKey];
    
    // Sliders values
    const conf = parseFloat(sliderConf.value);
    const iou = parseFloat(sliderIou.value);
    const aug = parseInt(sliderAug.value);

    // Update Slider text indicators
    confValText.textContent = conf.toFixed(2);
    iouValText.textContent = iou.toFixed(2);
    augValText.textContent = aug;

    // Update Ring Label texts dynamically
    accuracyLabel.textContent = spec.accuracyName;
    latencyLabel.textContent = spec.fpsName;

    // Mathematics simulations based on inputs
    let currentMap, currentFps, currentPrecision, currentRecall, currentLatency;

    if (modelKey === "yolo") {
      currentPrecision = spec.basePrecision + (conf - 0.45) * 25;
      currentRecall = spec.baseRecall - (conf - 0.45) * 35;
      
      currentMap = spec.baseMap + (aug - 3) * 2.5 - Math.abs(iou - 0.5) * 10;
      currentFps = spec.baseFps - (aug - 3) * 3 - (0.95 - conf) * 5;
      currentLatency = 1000 / currentFps;
      
    } else if (modelKey === "medical") {
      currentPrecision = spec.basePrecision + (conf - 0.45) * 20;
      currentRecall = spec.baseRecall - (conf - 0.45) * 30;
      
      currentMap = spec.baseMap + (aug - 3) * 1.5 - (iou - 0.5) * 5;
      currentFps = spec.baseFps - (aug - 3) * 2;
      currentLatency = 1000 / currentFps;
    } else {
      currentPrecision = spec.basePrecision + (conf - 0.45) * 15;
      currentRecall = spec.baseRecall - (conf - 0.45) * 20;
      
      currentMap = spec.baseMap + (aug - 3) * 1.0;
      currentFps = spec.baseFps - (aug - 3) * 12 - (iou - 0.5) * 30;
      currentLatency = spec.baseLatency + (aug - 3) * 50 - (conf - 0.45) * 100;
    }

    // Constraints & Limits bounding
    currentPrecision = Math.min(Math.max(currentPrecision, 30), 99.8);
    currentRecall = Math.min(Math.max(currentRecall, 20), 99.8);
    currentMap = Math.min(Math.max(currentMap, 40), 99.0);
    currentFps = Math.min(Math.max(currentFps, 5), spec.maxFps);
    currentLatency = Math.min(Math.max(currentLatency, 1.0), 2000.0);

    // Update DOM texts
    valMap.textContent = `${Math.round(currentMap)}%`;
    valFps.textContent = Math.round(currentFps);
    valPrecision.textContent = `${currentPrecision.toFixed(1)}%`;
    valRecall.textContent = `${currentRecall.toFixed(1)}%`;
    
    if (currentLatency >= 1000) {
      valLatency.textContent = `${(currentLatency / 1000).toFixed(2)} s`;
    } else {
      valLatency.textContent = `${currentLatency.toFixed(1)} ms`;
    }

    // SVG Circular stroke-dashoffset transitions (circumference = 251.2)
    const mapOffset = 251.2 * (1 - currentMap / 100);
    const fpsOffset = 251.2 * (1 - currentFps / spec.maxFps);

    ringMap.style.strokeDashoffset = mapOffset;
    ringFps.style.strokeDashoffset = fpsOffset;
  }

  // Bind Listeners
  modelSelect.addEventListener("change", updateSandbox);
  sliderConf.addEventListener("input", updateSandbox);
  sliderIou.addEventListener("input", updateSandbox);
  sliderAug.addEventListener("input", updateSandbox);

  // Initialize
  updateSandbox();
}

/* --- CONTACT FORM HANDLER WITH WEB3FORMS & TOASTS --- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const keyInput = document.getElementById("web3formsKey");
  const submitBtn = document.getElementById("formSubmitBtn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Check if key is configured
    if (keyInput.value === "YOUR_ACCESS_KEY_HERE" || keyInput.value === "") {
      showToast("Access Key not configured. To activate email delivery, generate a free Web3Forms key.", "error");
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending... <i class="fa-solid fa-spinner fa-spin"></i>`;

    const formData = new FormData(form);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    })
    .then(async (response) => {
      let json = await response.json();
      if (response.status === 200) {
        showToast("Message sent successfully! It will reach Vani's mail shortly.", "success");
        form.reset();
      } else {
        showToast(json.message || "Failed to send message. Please try again.", "error");
      }
    })
    .catch(error => {
      console.error(error);
      showToast("Network error. Please verify your connection.", "error");
    })
    .finally(() => {
      // Restore button state
      submitBtn.disabled = false;
      submitBtn.innerHTML = `Send Message <i class="fa-solid fa-paper-plane"></i>`;
    });
  });
}

function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  const iconClass = type === "success" ? "fa-solid fa-circle-check" : "fa-solid fa-triangle-exclamation";
  
  toast.innerHTML = `
    <i class="${iconClass} toast-icon"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Auto remove toast
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 5000);
}

/* --- VISITOR ANALYTICS COUNTER --- */
function initVisitorCounter() {
  const countSpan = document.getElementById("visitorCount");
  let currentCount = parseInt(localStorage.getItem("portfolio-visits") || "142");
  
  // Increment counter once per session
  if (!sessionStorage.getItem("visited-session")) {
    currentCount += 1;
    localStorage.setItem("portfolio-visits", currentCount.toString());
    sessionStorage.setItem("visited-session", "true");
  }

  // Format counter to look like a premium serial number, e.g., #0143
  const formattedCount = currentCount.toString().padStart(4, "0");
  countSpan.textContent = formattedCount;
}

/* --- INTERACTIVE AI CHATBOT (AVATAR ASSISTANT) --- */
function initAIChatbot() {
  const toggleBtn = document.getElementById("chatbotToggle");
  const chatWindow = document.getElementById("chatbotWindow");
  const closeBtn = document.getElementById("chatbotClose");
  const sendBtn = document.getElementById("chatbotSend");
  const chatInput = document.getElementById("chatbotInput");
  const chatMessages = document.getElementById("chatbotMessages");
  const configBtn = document.getElementById("chatbotConfigBtn");

  let geminiApiKey = localStorage.getItem("gemini-api-key") || "";

  toggleBtn.addEventListener("click", () => {
    chatWindow.classList.toggle("show");
    chatInput.focus();
  });

  closeBtn.addEventListener("click", () => {
    chatWindow.classList.remove("show");
  });

  sendBtn.addEventListener("click", handleUserMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleUserMessage();
  });

  configBtn.addEventListener("click", () => {
    const key = prompt("Enter your free Google Gemini API Key to enable Vani's Live AI Agent:", geminiApiKey);
    if (key !== null) {
      geminiApiKey = key.trim();
      localStorage.setItem("gemini-api-key", geminiApiKey);
      if (geminiApiKey) {
        showToast("Gemini AI API Key Saved! Your assistant is now a live LLM.", "success");
        appendMessage("System", "Assistant is now integrated with the Gemini Live API model. Ask me complex engineering questions!");
      } else {
        showToast("API Key cleared. Reverted to offline rule-based model.", "info");
      }
    }
  });

  function handleUserMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    // Append user message
    appendMessage("User", text);
    chatInput.value = "";

    // Show bot thinking loading bubble
    const thinkingBubble = document.createElement("div");
    thinkingBubble.className = "chat-msg bot thinking";
    thinkingBubble.innerHTML = `<i class="fa-solid fa-ellipsis fa-bounce"></i> thinking...`;
    chatMessages.appendChild(thinkingBubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      thinkingBubble.remove();
      if (geminiApiKey) {
        callGeminiAPI(text);
      } else {
        processOfflineResponse(text);
      }
    }, 800);
  }

  function appendMessage(sender, content) {
    const msg = document.createElement("div");
    msg.className = `chat-msg ${sender.toLowerCase()}`;
    msg.textContent = content;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  /* Offline keyword matching response */
  function processOfflineResponse(query) {
    const lowerQuery = query.toLowerCase();
    let reply = "";

    if (lowerQuery.includes("hello") || lowerQuery.includes("hi") || lowerQuery.includes("hey")) {
      reply = "Hello! I am Vani Malhotra's AI assistant. Ask me about her education, projects, skills, or certifications!";
    } else if (lowerQuery.includes("project") || lowerQuery.includes("code")) {
      reply = "Vani has created several key projects: \n1. MentalHealth NeuralMesh (Autonomous healthcare platform)\n2. Hyperlocal Discovery (Vendor ranking system)\n3. UHLIS Healthcare (Agentic queues & MRI scan analysis)\n4. SmartAgro (Precision crop diagnostic CNN)\n\nWhich one would you like to know more about?";
    } else if (lowerQuery.includes("education") || lowerQuery.includes("college") || lowerQuery.includes("srm")) {
      reply = "Vani is completing her B.Tech in Computer Science and Engineering at SRM Institute of Science and Technology, Kattankulathur (2023 - 2027). She holds a CGPA of 9.87/10, ranking in the top 1% of her cohort.";
    } else if (lowerQuery.includes("skill") || lowerQuery.includes("language") || lowerQuery.includes("python") || lowerQuery.includes("tech")) {
      reply = "Vani's core expertise lies in PyTorch, TensorFlow, LangChain, OpenCV, and SQL. She works with Python, C++, Java, JavaScript, and TypeScript, and has experience with AWS and Docker configurations.";
    } else if (lowerQuery.includes("experience") || lowerQuery.includes("intern") || lowerQuery.includes("job") || lowerQuery.includes("work")) {
      reply = "Vani's experience includes: \n- PwC (LaunchPad Intern: data architectures & GenAI workflow automation)\n- USRF 2025 (AI Research Fellow: underwater object detection mAP +75%)\n- Infosys Springboard 6.0 (Biometrics & OCR Fraud Detection)\n- Infotact Solutions (Full Stack Web Dev)\n- Navodita Infotech (X-Ray & MRI CNN detection)\n- VaultOfCodes (Web Developer)";
    } else if (lowerQuery.includes("contact") || lowerQuery.includes("mail") || lowerQuery.includes("phone") || lowerQuery.includes("linkedin")) {
      reply = "You can contact Vani Malhotra at:\n- Email: vanimalhotra00@gmail.com\n- Phone: +91-741-7151-348\n- LinkedIn: linkedin.com/in/vani-malhotra-contactvani\nOr send a message using the contact form on this page!";
    } else if (lowerQuery.includes("certification") || lowerQuery.includes("certified")) {
      reply = "Vani holds major certifications including:\n- Snowpro Associate (Snowflake)\n- Oracle OCI 2025 Certified Data Science Professional\n- SAP S/4HANA (ERP using GBI)\n- Summer Analytics 2025 (IIT Guwahati)\n- CDAC Noida Big Data Bootcamp";
    } else {
      reply = "Interesting query! I can answer basic details offline. To enable comprehensive conversational reasoning, click 'Configure live Gemini AI Agent' at the bottom of the chat window and provide a Gemini API key.";
    }

    appendMessage("Bot", reply);
  }

  /* Live Gemini API Integration */
  function callGeminiAPI(query) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;
    
    const systemInstruction = `You are Vani's personal AI representative, acting as her digital agent. Speak in a professional, polite, and technical tone. Represent Vani's achievements accurately using her resume details.
Resume Summary: B.Tech Computer Science student at SRM (2023-2027), CGPA 9.87/10 (Top 1%). Research Fellow USRF 2025 (+75% mAP in underwater YOLO detection). PwC LaunchPad Intern, Infosys Springboard 6.0 Fraud verification, Infotact, Navodita, VaultOfCodes. Expertise in PyTorch, TensorFlow, LangChain, RAG, OpenCV, PostgreSQL.
If asked details outside the resume, kindly answer that you represent Vani Malhotra and will relay the message to her. Keep responses relatively concise.`;

    const requestBody = {
      contents: [{
        parts: [{ text: query }]
      }],
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      }
    };

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody)
    })
    .then(async (response) => {
      const data = await response.json();
      if (response.status === 200 && data.candidates && data.candidates[0].content.parts[0].text) {
        appendMessage("Bot", data.candidates[0].content.parts[0].text);
      } else {
        appendMessage("Bot", "Error interacting with Gemini. Check your API Key or connection. Reverting to offline responses.");
        console.error(data);
      }
    })
    .catch(err => {
      console.error(err);
      appendMessage("Bot", "Network error while connecting to Gemini API.");
    });
  }
}
