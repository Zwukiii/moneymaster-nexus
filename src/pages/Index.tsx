import { useState } from "react";
import { DashboardView } from "@/components/DashboardView";
import { TransactionsView } from "@/components/TransactionsView";
import { InvestmentsView } from "@/components/InvestmentsView";
import { BudgetsView } from "@/components/BudgetsView";
import { Navigation } from "@/components/Navigation";
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  TrendingUp, 
  Wallet 
} from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
    { id: "investments", label: "Investments", icon: TrendingUp },
    { id: "budgets", label: "Budgets", icon: Wallet },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView />;
      case "transactions":
        return <TransactionsView />;
      case "investments":
        return <InvestmentsView />;
      case "budgets":
        return <BudgetsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
