// Student projects submitted at the End-to-End Machine Learning Pipeline session.
// Source: AI Club KIET event report. Each participant picked a dataset from a
// curated list, built the pipeline in Google Colab, and pushed the notebook to GitHub.

export const DOMAINS = ["Finance", "E-commerce", "Healthcare", "Other"];

export const studentProjects = [
  { student: "Suyash Shrivastava", title: "Credit Card Fraud Detection", dataset: "Credit Card Fraud", domain: "Finance", repo: "https://github.com/Suyash-dot/Credit_Card_Fraud_Detection" },
  { student: "Neetesh Kumar", title: "Predict Bread Inventory", dataset: "Grupo Bimbo Inventory Data", domain: "E-commerce", repo: "https://github.com/neeteshkumar-dev/Predict-Bread-Inventory" },
  { student: "Tanya Singh", title: "Product Price Optimization", dataset: "Online Retail", domain: "E-commerce", repo: "https://github.com/tanya-singh17/product-price-optimization" },
  { student: "Rishabh Maurya", title: "CartPulse AI", dataset: "E-commerce Behavior Data", domain: "E-commerce", repo: "https://github.com/rishabhmaurya-2103-dev/CartPulse-AI" },
  // The report's link for this project (…/Clothing-size-predictor/issues/1) is dead —
  // the GitHub account itself 404s — so the card renders without a live repo link.
  { student: "Aadrika Gupta", title: "Clothing Size Predictor", dataset: "Rent the Runway", domain: "E-commerce", repo: "https://github.com/aadrika25004/Clothing-size-predictor", repoAvailable: false },
  { student: "Shaurya Mani Tripathi", title: "Product Return Prediction", dataset: "E-commerce Returns", domain: "E-commerce", repo: "https://github.com/by-shauryaaa/product-return-prediction" },
  { student: "Shubhangi Srivastava", title: "ChurnGuard", dataset: "E-commerce Churn", domain: "E-commerce", repo: "https://github.com/shubhangi-1010/churnguard" },
  { student: "Ayushi Manav", title: "Churn Prediction", dataset: "E-commerce Churn", domain: "E-commerce", repo: "https://github.com/ash-if/churn_prediction" },
  { student: "Dikshansh", title: "Sales Conversion Rate Optimization", dataset: "Marketing Campaign Data", domain: "E-commerce", repo: "https://github.com/dikshanshchoudhary/Sales-Conversion-Rate-Optimization" },
  { student: "Aman Gupta", title: "Multi-Channel Sales Attribution", dataset: "E-commerce Funnel Data", domain: "E-commerce", repo: "https://github.com/AMAN-GUPTA-0956/multi_channel_sales_attribution" },
  { student: "Ayushman Pathak", title: "Insurance Claim Prediction", dataset: "Health Insurance Dataset", domain: "Finance", repo: "https://github.com/ayushmanpathak9034/Insurance-Claim-Prediction" },
  { student: "Atul Kumar", title: "Personal Loan Acceptance", dataset: "Bank Marketing", domain: "Finance", repo: "https://github.com/theatulkumar1/Personal-Loan-Acceptance" },
  { student: "Mahima Tiwari", title: "Salary Prediction", dataset: "Salary Data", domain: "Other", repo: "https://github.com/tiwarimahima962-boop/ai_presentation" },
  { student: "Shivam Shukla", title: "Employee Salary Prediction", dataset: "Salary Data", domain: "Other", repo: "https://github.com/shivam099-byte/Employee_Salary_prediction_model" },
  { student: "Sushil Kumar", title: "Mutual Fund Return Prediction", dataset: "Mutual Fund NAV", domain: "Finance", repo: "https://github.com/Sushilkumar6789-spec/Mutual-Fund-Return-Prediction" },
  { student: "Gouri Agarwal", title: "Company Bankruptcy Prediction", dataset: "Bankruptcy Data", domain: "Finance", repo: "https://github.com/GouriAgarwal/Company-Bankruptcy-Prediction" },
  { student: "Devansh Srivastava", title: "House Price Prediction", dataset: "King County Housing", domain: "Other", repo: "https://github.com/devanshsri1612-bit/House-Price-Prediction-ML" },
  { student: "Sumit Kumar Pandey", title: "Spending Pattern Clustering", dataset: "Mall Customer Data", domain: "E-commerce", repo: "https://github.com/sumitpandey30/spending-pattern-clustering" },
  { student: "Ayush Tomar", title: "Fraud Detection with Decision Tree & XGBoost", dataset: "Synthetic Fraud Data", domain: "Finance", repo: "https://github.com/ayushtomar236/Fraud_Detection_using_Decision_Tree_and_XGBoost" },
  { student: "Shourya Rastogi", title: "Loan Default Prediction", dataset: "Loan Default Prediction", domain: "Finance", repo: "https://github.com/rastogishourya05-svg/ML_Model" },
  { student: "Kishan Singh", title: "Customer Lifetime Value Prediction", dataset: "E-commerce CLTV", domain: "E-commerce", repo: "https://github.com/kishansingh7x/Customer-Lifetime-Value-Prediction" },
  { student: "Divya Mishra", title: "Parkinson's Disease Detection", dataset: "Parkinson's Telemonitoring", domain: "Healthcare", repo: "https://github.com/cyberstudycoder-divya-mishra/Parkinsons_Disease_Detection-" },
  { student: "Toshi Goel", title: "Heart Disease Prediction", dataset: "Cleveland Heart Dataset", domain: "Healthcare", repo: "https://github.com/toshigoel10/Machine-Learning" },
  { student: "Tejas Mishra", title: "Drug Classification", dataset: "Drug Classification", domain: "Healthcare", repo: "https://github.com/tejasjnp01-maker/Drug_Detection" },
  { student: "Aman Yadav", title: "Liver Patient Prediction", dataset: "Indian Liver Patient Dataset", domain: "Healthcare", repo: "https://github.com/bilkulaman/Decision-Tree-Model" },
  { student: "Utkarsh Chandra Singh", title: "Diabetes Risk Detection", dataset: "Pima Indians Diabetes", domain: "Healthcare", repo: "https://github.com/utkarshchandra38-del/Diabetes_Risk_Detection" },
  { student: "Ankit Raj", title: "Hospital Readmission", dataset: "Diabetes 130-US Hospitals", domain: "Healthcare", repo: "https://github.com/Ankit369raj/Hospital-readmission" },
  { student: "Himanshu Singh", title: "Medical Cost Prediction", dataset: "Medical Cost Personal Dataset", domain: "Healthcare", repo: "https://github.com/HimanshuSingh0912/MedicalCostPrediction" },
  { student: "Dherya Varshney", title: "Blood Donation Prediction", dataset: "Blood Transfusion Service Center", domain: "Healthcare", repo: "https://github.com/dheryavarshney1310/Blood-donation" },
  { student: "Ishant Mishra", title: "COVID Symptom Checker", dataset: "Symptom Data (synthetic)", domain: "Healthcare", repo: "https://github.com/Ishant-Mishra/COVID-Symptom-Checker" },
  { student: "Nimble Nayak", title: "Student Dropout Prediction", dataset: "Student Performance", domain: "Other", repo: "https://github.com/nimblenayak-svg/STUDENT_DROPOUT" },
  { student: "Ishu Tripathi", title: "Education Dropout Prediction", dataset: "Student Performance", domain: "Other", repo: "https://github.com/Ishu123-Tripathi/Education-Dropout-Prediction." },
  { student: "Vansh Baranwal", title: "Mental Health Prediction", dataset: "Mental Health in Tech", domain: "Healthcare", repo: "https://github.com/Vansh794/Mental-health-prediction-" },
  { student: "Subhanshu Verma", title: "BuildSense", dataset: "Construction Data", domain: "Other", repo: "https://github.com/DeepTensor-3070/BuildSense" },
  { student: "Ashutosh Sharma", title: "Breast Cancer Detection", dataset: "Breast Cancer Wisconsin", domain: "Healthcare", repo: "https://github.com/ashussharma16-commits/breast-cancer-detection" },
  { student: "Arpita Singh", title: "Resume ML Pipeline", dataset: "Resume Dataset", domain: "Other", repo: "https://github.com/Usa-122210/ML_PIPLINE_PROJECT_RESUME" },
  { student: "Mohd Mohtashim", title: "SkillBridge AI", dataset: "SkillBridge AI", domain: "Other", repo: "https://github.com/mohdmohtashim291-kiet/SkillBridge-AI-2" },
];

// The club's flagship project, presented at Innotech.
export const flagshipProject = {
  title: "ProPredict",
  badge: "Innotech Finalist",
  team: "Team Bexarc",
  desc:
    "A protein function prediction system based on machine learning, presented at Innotech in front of 1000+ attendees. The project secured a finalist position and showcased strong innovation and technical depth.",
  link: "https://www.linkedin.com/posts/antas01_propredict-with-team-bexarc-proud-to-activity-7402772961960845312-EDH5",
};

// Stages covered on Day 1 of the session, in the order they were taught.
export const pipelineStages = [
  "Data extraction and ingestion",
  "Data transformation and preprocessing",
  "Model training and testing",
  "Model selection and validation",
  "Evaluation using relevant metrics",
];

export const domainCounts = DOMAINS.reduce((acc, domain) => {
  acc[domain] = studentProjects.filter((project) => project.domain === domain).length;
  return acc;
}, {});
