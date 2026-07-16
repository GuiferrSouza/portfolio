
import { useEffect } from 'react'
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import AboutMeSection from './components/AboutMeSection';
import UpdatesSection from './components/UpdatesSection';
import ProjectsSection from './components/ProjectsSection';
import ContactsSection from './components/ContactsSection';

import { usePortfolioData } from './hooks/usePortfolioData';
import { registerAccess } from './services/supabase';

export default function App() {
  const {
    about,
    updates,
    contacts,
    projects,
    loading,
    error
  } = usePortfolioData();

  useEffect(() => registerAccess(), []);

  if (loading) return <Loading />;

  if (error) {
    return <ErrorMessage
      message="Error loading data"
      onRetry={() => window.location.reload()}
    />;
  }

  return (
    <div className="app noise noise-medium">
      <Header />

      <main className="main">
        <AboutMeSection data={about} />
        <UpdatesSection data={updates} />
        <ProjectsSection data={projects} />
        <ContactsSection data={contacts} />
      </main>

      <Footer name={about.name} />
    </div>
  );
}