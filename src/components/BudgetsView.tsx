import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, AlertTriangle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { budgetsApi } from "@/services/api";

const categoryIcons: Record<string, string> = {
  Food: "🍽️",
  Housing: "🏠",
  Transportation: "🚗",
  Entertainment: "🎬",
  Health: "🏥",
  Shopping: "🛍️",
  Bills: "💡",
  Other: "📦",
};

export const BudgetsView = () => {
  const { data: budgets = [], isLoading } = useQuery({
    queryKey: ["budgets"],
    queryFn: budgetsApi.getAll,
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading budgets...</div>;
  }

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
          const percentage = (budget.spentAmount / budget.limitAmount) * 100;
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
                  <div className="text-3xl">{categoryIcons[budget.category] || "📦"}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{budget.category}</h3>
                    <p className="text-sm text-muted-foreground">
                      {budget.spentAmount.toLocaleString()} / {budget.limitAmount.toLocaleString()} SEK
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
                    {(budget.limitAmount - budget.spentAmount).toLocaleString()} SEK remaining
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {budgets.length > 0 && (
        <Card className="p-6 gradient-card border-0 shadow-lg">
          <h3 className="font-semibold text-lg mb-4">Budget Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Budget</p>
              <p className="text-2xl font-bold">
                {budgets.reduce((sum, b) => sum + b.limitAmount, 0).toLocaleString()} SEK
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-destructive">
                {budgets.reduce((sum, b) => sum + b.spentAmount, 0).toLocaleString()} SEK
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Remaining</p>
              <p className="text-2xl font-bold text-success">
                {budgets
                  .reduce((sum, b) => sum + (b.limitAmount - b.spentAmount), 0)
                  .toLocaleString()}{" "}
                SEK
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
