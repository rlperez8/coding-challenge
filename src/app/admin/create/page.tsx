'use client'

import react from 'react'

import NavBar from "../../components/NavBar";
import EventSummary from "../../components/EventSummary";
import RegistrationForm from "../../components/RegistrationForm";
import EventDetials from "@/app/components/EventDetails";
import SpeakerBio from "@/app/components/SpeakerBio";
import Header from "@/app/components/Header"
import Link from "next/link";
import Head from "next/head";
import { useConferences } from "@/context/Conference";

import Create_Edit from '../components/create_edit';
import Create_Conference_Form from '../components/create_conference_form';
const AdminCreate: React.FC =() => {

   return (
        <div className="main">
          <div className="main_inner">

            <NavBar />

            <div className="main2">

              <Header/>
              <div className="main3">
                <Create_Edit/>
                <Create_Conference_Form/>
              </div>
            </div>
          </div>
        </div>
  );
}

export default AdminCreate