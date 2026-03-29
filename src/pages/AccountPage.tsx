import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Heart, User as UserIcon, LogOut } from "lucide-react";

const AccountPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-muted/10">
      <Navbar />
      <main className="pt-24 lg:pt-32 pb-16 lg:pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          
          <div className="mb-10 lg:mb-16">
            <h1 className="font-heading text-3xl lg:text-4xl text-foreground">My Account</h1>
            <p className="text-muted-foreground font-light mt-2 bg-gradient-to-r from-foreground to-transparent bg-clip-text">
              Welcome back, {user.phone}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <Tabs defaultValue="profile" className="w-full col-span-1 lg:col-span-4 flex flex-col lg:flex-row gap-8 lg:gap-12">
              
              <TabsList className="flex lg:flex-col h-auto bg-transparent border-0 lg:border-r border-border rounded-none justify-start items-start gap-2 lg:w-64 p-0">
                <TabsTrigger 
                  value="profile" 
                  className="w-full flex items-center gap-3 justify-start py-3 px-4 rounded-none border-b lg:border-l-2 lg:border-b-0 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-muted/50 data-[state=active]:shadow-none text-muted-foreground data-[state=active]:text-foreground transition-all"
                >
                  <UserIcon size={18} strokeWidth={1.5} />
                  <span className="text-sm tracking-[0.1em] uppercase">Profile</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="orders" 
                  className="w-full flex items-center gap-3 justify-start py-3 px-4 rounded-none border-b lg:border-l-2 lg:border-b-0 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-muted/50 data-[state=active]:shadow-none text-muted-foreground data-[state=active]:text-foreground transition-all"
                >
                  <Package size={18} strokeWidth={1.5} />
                  <span className="text-sm tracking-[0.1em] uppercase">Orders</span>
                </TabsTrigger>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 justify-start py-3 px-4 text-muted-foreground hover:text-red-400 hover:bg-red-50/50 transition-all text-sm tracking-[0.1em] uppercase"
                >
                  <LogOut size={18} strokeWidth={1.5} />
                  Logout
                </button>
              </TabsList>

              <div className="flex-1 w-full bg-background border border-border p-6 lg:p-10 shadow-sm">
                <TabsContent value="profile" className="mt-0 outline-none">
                  <h2 className="font-heading text-2xl mb-6 border-b border-border pb-4">Personal Details</h2>
                  <div className="space-y-6 max-w-md">
                    <div>
                      <label className="text-xs tracking-[0.15em] uppercase text-muted-foreground block mb-2">Phone Number</label>
                      <input 
                        type="text" 
                        value={user.phone} 
                        disabled 
                        className="w-full bg-muted/30 border border-border px-4 py-3 text-sm font-light text-foreground outline-none" 
                      />
                    </div>
                    <div>
                      <label className="text-xs tracking-[0.15em] uppercase text-muted-foreground block mb-2">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe" 
                        value={user.name || ""} 
                        readOnly 
                        className="w-full bg-transparent border border-border px-4 py-3 text-sm font-light outline-none focus:border-foreground transition-colors" 
                      />
                    </div>
                    <button className="luxury-btn w-full mt-4">Save Changes</button>
                  </div>
                </TabsContent>

                <TabsContent value="orders" className="mt-0 outline-none">
                  <h2 className="font-heading text-2xl mb-6 border-b border-border pb-4">Recent Orders</h2>
                  <div className="text-center py-12">
                    <Package size={32} strokeWidth={1} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                    <p className="text-muted-foreground font-light">You haven't placed any orders yet.</p>
                    <button onClick={() => navigate("/shop")} className="text-champagne text-xs tracking-[0.15em] uppercase underline underline-offset-4 mt-4 hover:text-foreground transition-colors">Start Shopping</button>
                  </div>
                </TabsContent>
              </div>

            </Tabs>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
