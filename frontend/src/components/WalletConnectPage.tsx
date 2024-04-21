import LogoComponent from "./Logo";
import { Web3Modal } from "./Web3Modal";

export default function WalletConnectPage() {
  return (
    <Web3Modal>
      <main className="h-screen w-screen flex flex-col items-center justify-center gap-12">
        <LogoComponent />
        <w3m-button />
      </main>
    </Web3Modal>
  );
}
