"use client";

import { useEffect, useState } from "react";
import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";
import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";

export default function DashboardPage() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [budgetData, setBudgetData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const [fetchedAccounts, fetchedTransactions] = await Promise.all([
        getUserAccounts(),
        getDashboardData(),
      ]);
      setAccounts(fetchedAccounts);
      setTransactions(fetchedTransactions || []);

      const defaultAccount = fetchedAccounts?.find(
        (account) => account.isDefault
      );
      if (defaultAccount) {
        const budget = await getCurrentBudget(defaultAccount.id);
        setBudgetData(budget);
      }
    }
    fetchData();
  }, []);

  const sendMail = async () => {
    alert("We will mail your data soon...");
    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ balance: 12000, expense: 2800 }),
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="space-y-8">
      <BudgetProgress
        initialBudget={budgetData?.budget}
        currentExpenses={budgetData?.currentExpenses || 0}
      />
      <DashboardOverview accounts={accounts} transactions={transactions} />

      <div className="flex justify-between w-full">
        <h2 className="text-3xl font-semibold">Account Status</h2>
        <Button onClick={sendMail}>
          <MailIcon /> Mail Data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full pt-5">
              <Plus className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
}
