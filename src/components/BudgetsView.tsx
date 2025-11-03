import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, AlertTriangle } from "lucide-react";

export const BudgetsView = () => {
  const budgets = [
    {
      id: 1,
      category: "Housing",
      limit: 12000,
      spent: 12000,
      icon: "🏠",
    },
    {
      id: 2,
      category: "Food & Dining",
      limit: 5000,
      spent: 3500,
      icon: "🍽️",
    },
    {
      id: 3,
      category: "Transportation",
      limit: 3000,
      spent: 2100,
      icon: "🚗",
    },
    {
      id: 4,
      category: "Entertainment",
      limit: 2000,
      spent: 2200,
      icon: "🎬",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Budgets</h2>
          <p className="text-muted-foreground">Monitor your spending limits</p>
        </div>
        <Button className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Budget
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100;
          const isOverBudget = percentage > 100;
          const isWarning = percentage > 80 && !isOverBudget;

          return (
            <Card
              key={budget.id}
              className={`p-6 gradient-card border-0 shadow-lg transition-base ${
                isOverBudget ? "ring-2 ring-destructive" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{budget.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{budget.category}</h3>
                    <p className="text-sm text-muted-foreground">
                      {budget.spent.toLocaleString()} / {budget.limit.toLocaleString()} SEK
                    </p>
                  </div>
                </div>
                {(isOverBudget || isWarning) && (
                  <AlertTriangle
                    className={`w-5 h-5 ${
                      isOverBudget ? "text-destructive" : "text-warning"
                    }`}
                  />
                )}
              </div>

              <div className="space-y-2">
                <Progress
                  value={Math.min(percentage, 100)}
                  className="h-3"
                  indicatorClassName={
                    isOverBudget
                      ? "gradient-danger"
                      : isWarning
                      ? "bg-warning"
                      : "gradient-success"
                  }
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {percentage.toFixed(0)}% used
                  </span>
                  <span
                    className={`font-semibold ${
                      isOverBudget
                        ? "text-destructive"
                        : isWarning
                        ? "text-warning"
                        : "text-success"
                    }`}
                  >
                    {(budget.limit - budget.spent).toLocaleString()} SEK remaining
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 gradient-card border-0 shadow-lg">
        <h3 className="font-semibold text-lg mb-4">Budget Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Budget</p>
            <p className="text-2xl font-bold">
              {budgets.reduce((sum, b) => sum + b.limit, 0).toLocaleString()} SEK
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
            <p className="text-2xl font-bold text-destructive">
              {budgets.reduce((sum, b) => sum + b.spent, 0).toLocaleString()} SEK
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Remaining</p>
            <p className="text-2xl font-bold text-success">
              {budgets
                .reduce((sum, b) => sum + (b.limit - b.spent), 0)
                .toLocaleString()}{" "}
              SEK
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
