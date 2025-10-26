import { WalletOverview } from "@/features/swap/components/wallet/WalletOverview";
import { QuickActions } from "@/features/swap/components/action/QuickActions";
import SwapPageLayout from "@/features/swap/components/layout/SwapPageLayout";
import MainTokenList from "@/features/swap/components/token/MainTokenList";
import MainLayout from "@/features/swap/components/layout/MainLayout";
import Background from "@/shared/components/Background";

const WalletPage = () => {
  return (
    <SwapPageLayout>
      <Background />
      <MainLayout>
        <WalletOverview />
        <QuickActions />
      </MainLayout>
      <MainTokenList />
    </SwapPageLayout>
  );
};

export default WalletPage;
