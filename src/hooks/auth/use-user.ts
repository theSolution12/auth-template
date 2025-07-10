import { useEffect, useState } from "react";
import { getUser } from "@/services/auth.services";
import { supabase } from "@/lib/supabase";

export const useUser = () => {
  const [user, setUser] = useState<any>(null); // You can use Supabase User type if prefer
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user } = await getUser(); // from service
        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
};
