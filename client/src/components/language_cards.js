import React from "react";
import { useState } from "react";
import LanguageCard from "./language_card.js";
export default function LanguageCards (props) {
    // language: props.language,
    // icon: props.icon,
    // description: props.description,
    return(
        <div>

        <h1 className='pt-5 pb-5 font-bold text-md text-white'>Not sure where to start? Pick a language below</h1>
        <div class="grid grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        <LanguageCard language= "Python" icon= "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg" description = "A Python thing"></LanguageCard>
        <LanguageCard language= "Java" icon= "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original-wordmark.svg" description = "A class-based, object-oriented programming language that is commonly used for building enterprise-level applications."></LanguageCard>
        <LanguageCard language= "C++" icon= "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" description = "A general-purpose, high-performance programming language that is often used for developing system software, game engines, and other resource-intensive applications."></LanguageCard>
        <LanguageCard language= "C#" icon= "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" description = "A general-purpose, object-oriented programming language that is commonly used for developing web applications, desktop applications, and mobile applications."></LanguageCard> 
        <LanguageCard language= "Javascript" icon= "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" description = "A scripting language used to create interactive web pages and web applications."></LanguageCard>
        <LanguageCard language= "HTML" icon= "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" description = "A markup language used to create web pages and web applications."></LanguageCard>
        <LanguageCard language= "Unity" icon= "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original-wordmark.svg" description = "A cross-platform game engine used to create 2D and 3D games."></LanguageCard>
        <LanguageCard language= "CSS" icon= "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" description = "A style sheet language used to describe the presentation of web pages and web applications."></LanguageCard>
        <LanguageCard language= "SQL" icon= "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" description = "A database language used to create, modify, and extract data from a database."></LanguageCard>
        <LanguageCard language= "Arduino" icon= "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original-wordmark.svg" description = "A low-level programming language used to create interactive objects."></LanguageCard>
        <LanguageCard language= "Swift" icon= "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original-wordmark.svg" description = "A general-purpose, object-oriented programming language that is commonly used for developing iOS and macOS applications."></LanguageCard>
        <LanguageCard language= "Kotlin" icon= "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original-wordmark.svg" description = "A general-purpose, object-oriented programming language that is commonly used for developing Android applications."></LanguageCard>
        
        </div>

      </div>
    )
}