import personalLoanImg from "assets/img/17.png";
import businessLoanImg from "assets/img/25.png";
// font Awesome
import {
  faUserShield,
  faBriefcase,
  faAddressCard,
  faMoneyBillWave,
  faLocationArrow,
  faUserTie,
  faHome,
  faFileSignature,
  faUniversity,
  faFileUpload
} from "@fortawesome/free-solid-svg-icons";

var initialState = {
  loan_types: [
    {
      text: "Personal Loan",
      icon: personalLoanImg,
      extra: "Coming Soon",
      disabled: true
    },
    {
      text: "Business Loan",
      icon: businessLoanImg,
      extra: "Apply Today",
      disabled: false
    }
  ],
  snackbar_list: [],
  borrow_amount_list: [
    { text: "$ 5,000", value: 5000 },
    { text: "$ 10,000", value: 10000 },
    { text: "$ 20,000", value: 20000 },
    { text: "$ 30,000", value: 30000 },
    { text: "$ 40,000", value: 40000 },
    { text: "$ 50,000", value: 50000 },
    { text: "$ 60,000", value: 60000 },
    { text: "$ 70,000", value: 70000 },
    { text: "$ 80,000", value: 80000 },
    { text: "$ 90,000", value: 90000 },
    { text: "$ 100,000", value: 100000 },
    { text: "$ 125,000", value: 125000 },
    { text: "$ 150,000", value: 150000 },
    { text: "$ 175,000", value: 175000 },
    { text: "$ 200,000", value: 200000 },
    { text: "$ 250,000 or More", value: 250001 }
  ],
  loan_purpose_list: [
    { text: "Buying Equipment", value: "BE" },
    { text: "Hiring Employees", value: "HE" },
    { text: "Marketing", value: "MA" },
    { text: "Purchasing Inventory", value: "PI" },
    { text: "Remodeling/Expansion", value: "RE" },
    { text: "Refinancing Debt", value: "RD" },
    { text: "Other", value: "OT" }
  ],
  business_types: [
    "Auto Repair",
    "Bar / Nightclub",
    "Retail",
    "Builder",
    "General Contractor",
    "Specialty Contractor",
    "Medical / Healthcare",
    "Furniture",
    "Grocery",
    "HVAC",
    "Petroleum / C-store",
    "Hair Salon / Nail Salon / Spa",
    "Hospitality / Hotel / Lodging",
    "Restaurant",
    "Service",
    "Trucking",
    "Other"
  ],
  business_info_questions: {
    legal_name: 3,
    legal_structure: 4
  },
  application_steps_list: [
    { key: 0, name: "Personal Info", icon: faUserShield },
    { key: 1, name: "Business Info", icon: faBriefcase },
    { key: 2, name: "Business Address", icon: faAddressCard },
    { key: 3, name: "Business Payment", icon: faMoneyBillWave },
    { key: 4, name: "Business Location", icon: faLocationArrow },
    { key: 5, name: "Business Ownership", icon: faUserTie },
    { key: 6, name: "Home Address", icon: faHome },
    { key: 7, name: "Signature & Terms", icon: faFileSignature },
    { key: 8, name: "Bank Account Verification", icon: faUniversity },
    { key: 9, name: "Document Upload", icon: faFileUpload }
  ]
};

export default function elementReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
