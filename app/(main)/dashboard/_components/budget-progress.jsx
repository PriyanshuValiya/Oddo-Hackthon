"use client";
import { useState, useEffect } from "react";
import { Pencil, Check, X, AlertCircle, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateBudget } from "@/actions/budget";

export function BudgetProgress({ initialBudget, currentExpenses }) {
  const defaultBudget = { amount: 0 };
  initialBudget = initialBudget || defaultBudget;
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(initialBudget?.amount?.toString() || "0");
  const [isOverspent, setIsOverspent] = useState(false);
  const [adjustedDailyLimit, setAdjustedDailyLimit] = useState(null);
  const [suggestedPlan, setSuggestedPlan] = useState(null);
  const [tips, setTips] = useState([]);

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const daysPassed = today.getDate();
  const daysRemaining = daysInMonth - daysPassed;

  useEffect(() => {
    if (!initialBudget) {
  return <p>Loading budget data...</p>;
}

    if (initialBudget && currentExpenses > initialBudget.amount) {
      setIsOverspent(true);
      const dailyLimit = (initialBudget.amount / (daysRemaining + daysInMonth)).toFixed(2);
      setAdjustedDailyLimit(dailyLimit);
      setSuggestedPlan(`You have used your budget early! Limit daily spending to $${dailyLimit} for the next ${daysRemaining} days.`);
      
      // Generate budgeting tips dynamically
      const newTips = [
        "Review transactions and cut non-essential expenses (e.g., subscriptions, dining out).",
        "Divide spending into 'Needs', 'Wants', and 'Savings' categories and adjust accordingly.",
        "Try withdrawing your daily limit in cash to better control spending.",
        "Plan meals at home instead of eating out to save on food expenses.",
        "Use free or low-cost entertainment options instead of paid services.",
        "Track expenses in real-time using a budgeting app.",
      ];
      setTips(newTips);
    } else {
      setIsOverspent(false);
      setAdjustedDailyLimit(null);
      setSuggestedPlan(null);
      setTips([]);
    }
  }, [currentExpenses, initialBudget, daysRemaining]);

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    try {
      await updateBudget(amount); // Update backend
  
      // ✅ Manually update UI without waiting for a prop update
      initialBudget.amount = amount; // Temporary fix to reflect changes immediately
  
      setIsEditing(false);
      toast.success("Budget updated successfully!");
    } catch (error) {
      console.error("Error updating budget:", error);
      toast.error("Failed to update budget. Try again.");
    }
  };
  
  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || "");
    setIsEditing(false);
  };

  const percentUsed = (currentExpenses / initialBudget.amount) * 100 || 0;


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-sm font-medium">Monthly Budget (Default Account)</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-32"
                  placeholder="Enter amount"
                  autoFocus
                />
                <Button variant="ghost" size="icon" onClick={handleUpdateBudget}>
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleCancel}>
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <CardDescription>
                  {initialBudget ? `$${currentExpenses.toFixed(2)} of $${initialBudget.amount.toFixed(2)} spent` : "No budget set"}
                </CardDescription>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} className="h-6 w-6">
                  <Pencil className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {initialBudget && (
          <div className="space-y-2">
            <Progress
              value={percentUsed}
              extraStyles={
                percentUsed > 100 ? "bg-red-500" : percentUsed >= 90 ? "bg-yellow-500" : "bg-green-500"
              }
            />
            <p className="text-xs text-muted-foreground text-right">{percentUsed.toFixed(1)}% used</p>
          </div>
        )}

        {isOverspent && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>You have used your budget early! Consider adjusting your spending.</span>
            </div>
            <p className="mt-2 text-sm">{suggestedPlan}</p>
            <div className="mt-4 p-3 bg-yellow-100 text-yellow-700 rounded-md">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                <span><strong>Smart Budgeting Tips:</strong></span>
              </div>
              <ul className="list-disc pl-6 mt-2 text-sm">
                {tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
