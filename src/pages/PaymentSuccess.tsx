import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/i18n/LanguageContext";

const PaymentSuccess = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-success mb-6" />
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">{t("checkout.confirmed")}</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">{t("checkout.confirmed_sub")}</p>
        <Link to="/products">
          <Button className="btn-gradient">{t("checkout.continue_shopping")}</Button>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
