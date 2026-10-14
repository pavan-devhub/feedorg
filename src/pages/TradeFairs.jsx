import { useState } from "react";
import { ArrowRight, Globe, Info, Leaf, MapPin, Search, Sprout, Wheat } from "lucide-react";
import Navbar from "../components/Navbar";
import states from "./states_urls";
import "./TradeFairs.css";
function TradeFairs({ onNavigate, isLoggedIn, user, onLogout }) {

    const [state, setState] = useState("");
    const [ministry, setMinistry] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");

    const ministries = [
        "MINISTRY OF AGRICULTURE",
        "MINISTRY OF COMMERCE",
        "MINISTRY OF CONSUMER & PDS",
        "MINISTRY OF MSME",
        "MINISTRY OF CO-OPERATIVE",
        "MINISTRY OF AAYUSH",
        "MINISTRY OF SHIPPING",
        "MINISTRY OF CHEMICALS & FERTILIZERS",
        "MINISTRY OF FOREST",
        "MINISTRY OF HEALTH & FAMILY WELFARE",
        "MINISTRY OF WOMEN & CHILD DEVELOPMENT",
        "MINISTRY OF DEFENCE",
        "MINISTRY OF TEXTILE",
        "MINISTRY OF FINANCE",
        "MINISTRY OF HRD",
        "MINISTRY OF SKILL DEVELOPMENT",
        "MINISTRY OF RAILWAYS",
        "MINISTRY OF FOOD PROCESSING",
        "MINISTRY OF CIVIL AVIATION",
        "MINISTRY OF ANIMAL HUSBANDRY",
        "MINISTRY OF EXTERNAL AFFAIRS"
    ];

    const years = [
        "2026",
        "2027",
        "2028",
        "2029",
        "2030"
    ];

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    function handleViewFairs() {

        if (
            state === "" ||
            ministry === "" ||
            year === "" ||
            month === ""
        ) {
            alert("Please select State, Ministry, Year and Month.");
            return;
        }


        const selectedState = states.find(function (item) {
            return item.state === state;
        });


        if (selectedState) {

            window.open(
                selectedState.url,
                "_blank"
            );

        } else {

            alert("Trade fair URL not available for this state.");

        }
    }


    function handleInternational() {

        window.open(
            "https://apeda.gov.in/TradeFairs",
            "_blank"
        );

    }


    return (

        <div className="trade-page">

            <Navbar onNavigate={onNavigate} isLoggedIn={isLoggedIn} user={user} onLogout={onLogout} currentPage="TradeFairs" />


            {/* Decorative greenery. Every icon on this page is an SVG, not an emoji: emoji are drawn
                by each OS's own emoji font, so they looked different (or as "IN" letters / empty
                boxes) on every system. */}

            <div className="leaf leaf-one" aria-hidden="true">
                <Leaf />
            </div>

            <div className="leaf leaf-two" aria-hidden="true">
                <Leaf />
            </div>

            <div className="leaf leaf-three" aria-hidden="true">
                <Sprout />
            </div>

            <div className="leaf leaf-four" aria-hidden="true">
                <Leaf />
            </div>


            {/* Header */}

            <header className="trade-header">

                <div className="brand-section">

                    <div className="trade-brand-icon" aria-hidden="true">
                        <Wheat size={30} />
                    </div>

                    <div>

                        <h1>
                            Agri Trade Fairs
                        </h1>

                        <p>
                            Discover • Connect • Grow
                        </p>

                    </div>

                </div>


                <div className="header-leaves" aria-hidden="true">
                    <Leaf size={24} />
                    <Sprout size={24} />
                    <Leaf size={24} />
                </div>

            </header>


            {/* Main Content */}

            <main className="trade-container">


                {/* Title */}

                <section className="hero-section">

                    <div className="hero-icon" aria-hidden="true">
                        <Wheat size={52} />
                    </div>

                    <h2>
                        Explore Trade Fairs
                    </h2>

                    <p>
                        Find agricultural and business trade fairs
                        across India and international markets.
                    </p>

                </section>



                {/* Domestic / International */}

                <section className="type-section">

                    <button
                        className="type-button active"
                    >

                        <MapPin size={18} aria-hidden="true" />

                        India Domestic

                    </button>


                    <button
                        className="type-button"
                        onClick={handleInternational}
                    >

                        <Globe size={18} aria-hidden="true" />

                        International

                    </button>

                </section>



                {/* Filter Card */}

                <section className="filter-card">


                    <div className="card-heading">

                        <div className="heading-icon" aria-hidden="true">
                            <Sprout size={28} />
                        </div>


                        <div>

                            <h3>
                                Find Domestic Trade Fairs
                            </h3>

                            <p>
                                Select the required details to
                                explore trade fairs.
                            </p>

                        </div>

                    </div>



                    {/* Filters */}

                    <div className="filters-grid">


                        {/* State */}

                        <div className="filter-group">

                            <label>
                                State
                            </label>

                            <select
                                value={state}
                                onChange={function (event) {
                                    setState(event.target.value);
                                }}
                            >

                                <option value="">
                                    Select State
                                </option>


                                {states.map(function (item, index) {

                                    return (

                                        <option
                                            key={index}
                                            value={item.state}
                                        >
                                            {item.state}
                                        </option>

                                    );

                                })}

                            </select>

                        </div>



                        {/* Ministry */}

                        <div className="filter-group">

                            <label>
                                Ministry / Department
                            </label>

                            <select
                                value={ministry}
                                onChange={function (event) {
                                    setMinistry(event.target.value);
                                }}
                            >

                                <option value="">
                                    Select Ministry / Department
                                </option>


                                {ministries.map(function (item, index) {

                                    return (

                                        <option
                                            key={index}
                                            value={item}
                                        >
                                            {item}
                                        </option>

                                    );

                                })}

                            </select>

                        </div>



                        {/* Year */}

                        <div className="filter-group">

                            <label>
                                Year
                            </label>

                            <select
                                value={year}
                                onChange={function (event) {
                                    setYear(event.target.value);
                                }}
                            >

                                <option value="">
                                    Select Year
                                </option>


                                {years.map(function (item, index) {

                                    return (

                                        <option
                                            key={index}
                                            value={item}
                                        >
                                            {item}
                                        </option>

                                    );

                                })}

                            </select>

                        </div>



                        {/* Month */}

                        <div className="filter-group">

                            <label>
                                Month
                            </label>

                            <select
                                value={month}
                                onChange={function (event) {
                                    setMonth(event.target.value);
                                }}
                            >

                                <option value="">
                                    Select Month
                                </option>


                                {months.map(function (item, index) {

                                    return (

                                        <option
                                            key={index}
                                            value={item}
                                        >
                                            {item}
                                        </option>

                                    );

                                })}

                            </select>

                        </div>

                    </div>



                    {/* View Button */}

                    <button
                        className="view-button"
                        onClick={handleViewFairs}
                    >

                        <Search size={18} aria-hidden="true" />

                        View Trade Fairs

                        <ArrowRight size={18} aria-hidden="true" />

                    </button>



                    {/* Small information */}

                    <div className="info-box">

                        <Info size={19} className="trade-info-icon" aria-hidden="true" />

                        <p>
                            Select a state to view the available
                            trade fairs for that location.
                        </p>

                    </div>


                </section>

            </main>



            {/* Footer */}

            <footer className="trade-footer">

                <Sprout size={18} aria-hidden="true" />

                <p>
                    Connecting Farmers, Businesses & Opportunities
                </p>

                <Wheat size={18} aria-hidden="true" />

            </footer>


        </div>
    );
}

export default TradeFairs;