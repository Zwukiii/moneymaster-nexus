import { MetricCard } from "@/components/MetricCard";
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { historyApi, transactionsApi } from "@/services/api";

export const DashboardView = () => {
  const { data: history } = useQuery({
    queryKey: ["history"],
    queryFn: historyApi.getAll,
  });

  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: transactionsApi.getAll,
  });

  const latestHistory = history?.[history.length - 1];
  
  const metrics = {
    totalIncome: latestHistory?.totalIncome || 0,
    totalExpenses: latestHistory?.totalExpenses || 0,
    balance: latestHistory?.balance || 0,
    savingsRate: latestHistory?.totalIncome 
      ? ((latestHistory.totalIncome - latestHistory.totalExpenses) / latestHistory.totalIncome * 100)
      : 0,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Track your financial health at a glance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Income"
          value={`${metrics.totalIncome.toLocaleString()} SEK`}
          icon={TrendingUp}
          trend="+12.5%"
          variant="success"
        />
        <MetricCard
          title="Total Expenses"
          value={`${metrics.totalExpenses.toLocaleString()} SEK`}
          icon={TrendingDown}
          trend="+8.2%"
          variant="danger"
        />
        <MetricCard
          title="Balance"
          value={`${metrics.balance.toLocaleString()} SEK`}
          icon={Wallet}
          variant="primary"
        />
        <MetricCard
          title="Savings Rate"
          value={`${metrics.savingsRate}%`}
          icon={PiggyBank}
          trend="+2.1%"
          variant="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 gradient-card border-0 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {transactions?.slice(0, 3).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <span className={`font-semibold text-sm ${transaction.type === 'INCOME' ? 'text-success' : 'text-destructive'}`}>
                  {transaction.type === 'INCOME' ? '+' : '-'}{transaction.amount.toLocaleString()} SEK
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 gradient-card border-0 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Add Transaction", icon: "💸" },
              { label: "New Investment", icon: "📈" },
              { label: "Set Budget", icon: "🎯" },
              { label: "View Reports", icon: "📊" },
            ].map((action) => (
              <button
                key={action.label}
                className="p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-base text-left"
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <p className="text-sm font-medium">{action.label}</p>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
