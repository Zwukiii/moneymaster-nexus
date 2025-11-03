import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, TrendingDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { investmentsApi } from "@/services/api";

export const InvestmentsView = () => {
  const { data: investments = [], isLoading } = useQuery({
    queryKey: ["investments"],
    queryFn: investmentsApi.getAll,
  });

  const { data: totalInvested = 0 } = useQuery({
    queryKey: ["totalInvested"],
    queryFn: investmentsApi.getTotalInvested,
  });

  const { data: totalCurrent = 0 } = useQuery({
    queryKey: ["totalCurrent"],
    queryFn: investmentsApi.getTotalCurrent,
  });

  const { data: totalRoi = 0 } = useQuery({
    queryKey: ["totalRoi"],
    queryFn: investmentsApi.getTotalRoi,
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading investments...</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Investments</h2>
          <p className="text-muted-foreground">Track your portfolio performance</p>
        </div>
        <Button className="gradient-success">
          <Plus className="w-4 h-4 mr-2" />
          Add Investment
        </Button>
      </div>

      <Card className="p-6 gradient-success border-0 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm font-medium text-success-foreground/80 mb-1">
              Total Invested
            </p>
            <p className="text-3xl font-bold text-success-foreground">
              {totalInvested.toLocaleString()} SEK
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-success-foreground/80 mb-1">
              Current Value
            </p>
            <p className="text-3xl font-bold text-success-foreground">
              {totalCurrent.toLocaleString()} SEK
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-success-foreground/80 mb-1">
              Total Return
            </p>
            <p className="text-3xl font-bold text-success-foreground flex items-center gap-2">
              {totalRoi > 0 ? "+" : ""}
              {totalRoi.toFixed(1)}%
              {totalRoi > 0 ? (
                <TrendingUp className="w-6 h-6" />
              ) : (
                <TrendingDown className="w-6 h-6" />
              )}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((investment) => {
          const profit = investment.currentValue - investment.amountInvested;
          const isPositive = investment.roi > 0;

          return (
            <Card
              key={investment.id}
              className="p-6 gradient-card border-0 shadow-lg hover:shadow-xl transition-base"
            >
              <h3 className="font-semibold text-lg mb-1">{investment.ticker}</h3>
              <p className="text-xs text-muted-foreground mb-4">
                {investment.category} • {investment.platform}
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Invested</p>
                  <p className="text-xl font-bold">
                    {investment.amountInvested.toLocaleString()} SEK
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Current Value</p>
                  <p className="text-xl font-bold">
                    {investment.currentValue.toLocaleString()} SEK
                  </p>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Return</span>
                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          isPositive ? "text-success" : "text-destructive"
                        }`}
                      >
                        {isPositive ? "+" : ""}
                        {profit.toLocaleString()} SEK
                      </p>
                      <p
                        className={`text-sm ${
                          isPositive ? "text-success" : "text-destructive"
                        }`}
                      >
                        {isPositive ? "+" : ""}
                        {investment.roi.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
