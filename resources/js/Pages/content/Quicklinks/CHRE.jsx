import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import MainLayout from "../../../layouts/MainLayout";
import chreBannerImg from '../../../assets/banner/coregoals-banner.png';
import jeanLoquillanoImg from '../../../assets/images/JEAN_LOQUILLANO.png';

// ===================== Motion variants =====================
const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 },
    },
};

const tabPanelVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    },
};

// ===================== Slideshow Data =====================
const SLIDES = [
    {
        id: "chre-1",
        image: chreBannerImg,
        title: "A Hub for Human Rights Education",
        description:
            "The Center for Human Rights Education (CHRE) serves as a dedicated hub for promoting human rights awareness, education, and advocacy within the City College of Cagayan de Oro community.",
    },
    {
        id: "chre-2",
        image: chreBannerImg,
        title: "Empowering Students Through Rights Literacy",
        description:
            "CHRE equips students with the knowledge, skills, and values necessary to understand, protect, and uphold human rights in their personal and professional lives.",
    },
    {
        id: "chre-3",
        image: chreBannerImg,
        title: "Fostering a Culture of Respect and Dignity",
        description:
            "Through programs and activities, CHRE cultivates a campus culture that respects human dignity, promotes equality, and encourages active citizenship.",
    },
    {
        id: "chre-4",
        image: chreBannerImg,
        title: "Community Engagement and Advocacy",
        description:
            "CHRE extends its reach beyond the campus through community partnerships, advocacy campaigns, and outreach programs that promote human rights at the local level.",
    },
];

// ============ Under Construction placeholder ============
const UnderConstruction = () => (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#157d3c] bg-[#f0f7f2] px-6 py-14 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#157d3c]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
            >
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        </div>

        <h4 className="mb-2 text-lg font-extrabold tracking-tight text-[#1a1a1a]">
            Under Construction
        </h4>

        <p className="max-w-md text-sm leading-relaxed text-gray-600">
            This section is currently being prepared. Please check back soon
            for updated content and information.
        </p>

        <div className="mt-4 h-1 w-16 rounded-full bg-[#f5c518]" />
    </div>
);

// ============ Content primitives ============
const SectionHeading = ({ children }) => (
    <h4 className="mt-8 mb-3 text-base font-extrabold uppercase tracking-wider text-[#157d3c] first:mt-0">
        {children}
    </h4>
);

const SubHeading = ({ children }) => (
    <h5 className="mt-6 mb-2 text-sm font-extrabold uppercase tracking-wider text-[#1a1a1a]">
        {children}
    </h5>
);

const Prose = ({ children }) => (
    <p className="text-justify leading-relaxed text-gray-700 mb-4">{children}</p>
);

const NumberedList = ({ items }) => (
    <ol className="list-decimal list-outside ml-5 space-y-3 text-gray-700 leading-relaxed">
        {items.map((item, i) => (
            <li key={i} className="pl-1">
                <span className="font-semibold text-[#1a1a1a]">{item.title}:</span>{" "}
                {item.body}
            </li>
        ))}
    </ol>
);

const BulletList = ({ items }) => (
    <ul className="list-disc list-outside ml-5 space-y-2 text-gray-700 leading-relaxed">
        {items.map((item, i) => (
            <li key={i} className="pl-1">
                <span className="font-semibold text-[#1a1a1a]">{item.title}:</span>{" "}
                {item.body}
            </li>
        ))}
    </ul>
);

const InfoCard = ({ title, children }) => (
    <div className="rounded-xl border border-gray-200 bg-[#f0f7f2] p-5 shadow-sm">
        <h4 className="m-0 mb-2 text-sm font-extrabold uppercase tracking-wider text-[#157d3c]">
            {title}
        </h4>
        <p className="m-0 text-sm leading-relaxed text-gray-700 text-justify">
            {children}
        </p>
    </div>
);

// ============ About CHRE content ============
const AboutCHRE = () => (
    <div>
        <Prose>
            The office of the Center for Human Rights Education (CHRE) of the City
            College of Cagayan de Oro aims at promoting and advancing human rights
            awareness, understanding, and advocacy among students, faculty, and staff
            within and outside the academic community. It underscores developing a
            culture of tolerance, respect, and non-discrimination through facilitating
            training and capacity-building workshops for teaching and non-teaching
            personnel, students, and community on human rights education.
        </Prose>

        <div className="mb-6">
            <InfoCard title="Looking for the HRE Framework?">
                See the <strong>HRE Framework</strong> tab for the three-level
                model (Values &amp; Awareness, Accountability Formation,
                Transformational HRE) and the full list of audiences who need
                human rights education.
            </InfoCard>
        </div>

        <SectionHeading>Rationale and Significance of Establishing CHRE at CCCDO</SectionHeading>
        <NumberedList
            items={[
                {
                    title: "Cultivating Human Rights Champions",
                    body: "The center can play a pivotal role in nurturing future generations of human rights defenders by providing comprehensive education on human rights principles, international law, and local contexts.",
                },
                {
                    title: "Fostering Research and Knowledge Production",
                    body: "It can serve as a hub for research and scholarship on human rights issues, contributing to the development of new knowledge and innovative approaches to human rights promotion and protection.",
                },
                {
                    title: "Promoting Human Rights Advocacy",
                    body: "The center can support students and faculty in engaging in human rights advocacy activities, such as public speaking, community organizing, and legal advocacy.",
                },
                {
                    title: "Strengthening Institutional Commitment to Human Rights",
                    body: "By establishing a center dedicated to human rights education, institutions of higher education can demonstrate their commitment to upholding human rights principles and values.",
                },
                {
                    title: "Building Partnerships and Collaborations",
                    body: "The center can facilitate partnerships and collaborations with other organizations and institutions working on human rights issues, both locally and internationally.",
                },
            ]}
        />
        <Prose>
            In a nutshell, the establishment of a Center for Human Rights Education at
            the City College of Cagayan de Oro is a significant step towards promoting
            a culture of respect for human rights and fostering a more just and
            equitable society.
        </Prose>

        <div className="grid gap-4 sm:grid-cols-2 mt-6">
            <InfoCard title="Vision">
                A world where human rights are universally respected, protected, and
                promoted, and where all individuals enjoy their fundamental rights
                without discrimination.
            </InfoCard>
            <InfoCard title="Mission">
                To advance human rights education, research, and advocacy in higher
                education and beyond, fostering a culture of respect for human dignity
                and equality.
            </InfoCard>
        </div>

        <SectionHeading>Goals</SectionHeading>
        <BulletList
            items={[
                {
                    title: "Education",
                    body: "To provide comprehensive and accessible human rights education to students, faculty, and staff, equipping them with the knowledge and skills to understand, defend, and promote human rights.",
                },
                {
                    title: "Research",
                    body: "To conduct rigorous research on human rights issues, contributing to the development of new knowledge and innovative approaches to human rights promotion and protection.",
                },
                {
                    title: "Advocate",
                    body: "To support students, faculty, and staff in engaging in human rights advocacy activities, both locally and internationally.",
                },
                {
                    title: "Collaborate",
                    body: "To foster partnerships with other organizations and institutions working on human rights issues, both within and outside the academic community.",
                },
                {
                    title: "Influence Policy",
                    body: "To advocate for policies and practices that promote human rights at all levels, from local to international.",
                },
                {
                    title: "Promote Cultural Understanding",
                    body: "To foster intercultural understanding and respect, recognizing the diversity of human experiences and perspectives.",
                },
                {
                    title: "Empower Communities",
                    body: "To support community-based initiatives that promote human rights and address the needs of marginalized groups.",
                },
            ]}
        />
    </div>
);

// ============ Legal Foundation content ============
const LegalFoundation = () => (
    <div>
        <Prose>
            This section presents the basic knowledge for understanding human
            rights education — the legal foundations that support it both
            internationally and nationally, its importance, its goals, and the
            sectors that most need it.
        </Prose>

        {/* ---------- A. Principles & Legal Foundations ---------- */}
        <SectionHeading>
            Principles and Legal Foundations of Human Rights Education
        </SectionHeading>

        <SubHeading>Core Treaties and Declarations</SubHeading>
        <Prose>
            The preamble of the Universal Declaration of Human Rights (UDHR)
            exhorts individuals and organs of society to &ldquo;strive by
            teaching and education to promote respect for these rights and
            freedoms.&rdquo; Article 26.2 further urges that education shall be
            directed to the full development of the human personality and to
            the strengthening of respect for human rights and fundamental
            freedoms.
        </Prose>
        <Prose>
            Building on these exhortations, the UN General Assembly proclaimed
            the <strong>UN Decade for Human Rights Education (1995–2004)</strong>{" "}
            to build and strengthen programmes and capacities for human rights
            education at the international, regional, national, and local
            levels. This led to the ongoing{" "}
            <strong>World Programme for Human Rights Education</strong> (from
            2005) and, in December 2011, the{" "}
            <strong>
                United Nations Declaration on Human Rights Education and
                Training
            </strong>
            , whose Article 1 states: &ldquo;Everyone has the right to know,
            seek and receive information about all human rights and fundamental
            freedoms and should have access to human rights education and
            training.&rdquo;
        </Prose>

        <SubHeading>What is Human Rights Education?</SubHeading>
        <Prose>
            In the proclamation of the UN Decade for Human Rights Education
            (December 1994), the General Assembly defined human rights
            education as more than mere provision of information — rather, as
            &ldquo;a comprehensive lifelong process by which people at all
            levels in development and in all strata of society learn respect
            for the dignity of others and the means and methods of ensuring
            that respect in all societies.&rdquo;
        </Prose>
        <Prose>
            Human rights education empowers individuals and communities to
            develop their behavior, attitude, skills, and knowledge to
            contribute to the building and promotion of a universal culture of
            human rights. It begins with the individual and branches out to
            encompass the community at large, and may take the form of
            training, dissemination, and information efforts.
        </Prose>
        <Prose>
            Human rights education takes its authority from human rights
            principles ensconced in national and international charters and
            laws. Central to its methods are human rights values that promote
            the holistic development of people, leading them to take action as
            individuals and as members of local and global communities.
        </Prose>

        <SubHeading>History of Human Rights Education in the Philippines</SubHeading>
        <Prose>
            Established in 1987, the{" "}
            <strong>Commission on Human Rights of the Philippines (CHRP)</strong>{" "}
            is mandated by the 1987 Constitution to establish &ldquo;a
            continuing program of research, education, and information to
            enhance respect for the primacy of human rights&rdquo; and to
            recommend to the legislative body &ldquo;effective measures to
            promote human rights.&rdquo; Human rights education is thus an
            indispensable arm of the CHR in ensuring the long-term prevention
            of human rights abuses and a crucial investment in making a
            culture of human rights a reality in our society.
        </Prose>
        <Prose>
            The First Commission adopted the Human Rights Education and
            Training Program (HRETP) in 1988, expanding its target audiences
            from potential violators to two major categories — potential
            violators and potential victims. In response to the UN Decade, the
            CHRP drew up decade-long sectoral plans at the regional and
            national levels, resulting in the{" "}
            <strong>Philippine Human Rights Education Plan for 1998–2007</strong>
            . Its general objective was &ldquo;an organized, functional,
            effective and relevant Human Rights Education Program in formal,
            non-formal, and community-based sectors.&rdquo;
        </Prose>
        <Prose>
            The 1992 Joint Declaration of Undertaking between the Commission on
            Human Rights and the Department of Education, Culture and Sports
            formalized partnerships among these agencies. Key initiatives
            implemented include:
        </Prose>
        <BulletList
            items={[
                {
                    title: "Curriculum Development",
                    body: "Integration of human rights and responsibilities across levels of formal and non-formal education.",
                },
                {
                    title: "Training and Capacity Building",
                    body: "For various school levels in undertaking human rights education.",
                },
                {
                    title: "Monitoring, Research, and Evaluation",
                    body: "Regular review of human rights instructional materials development and information campaigns.",
                },
            ]}
        />
        <Prose>
            During the UN Decade, curriculum development was intensified
            through human rights teaching exemplars, revised in 2001 with the
            Department of Education (DepEd) to align with the Revised Basic
            Education Curriculum. These were implemented nationwide from SY
            2004–2005, followed by regional book launchings, trainer workshops,
            in-service training, and regional and youth forums.
        </Prose>

        {/* ---------- B. Importance ---------- */}
        <SectionHeading>Importance of Human Rights Education</SectionHeading>
        <Prose>
            Per the 1993 World Conference on Human Rights in Vienna, human
            rights education is essential for the promotion and achievement of
            stable and harmonious relations among communities and for
            fostering mutual understanding, tolerance, and peace. Education
            plays a key role in upholding human rights, supporting human
            development, and strengthening civil society — paving the way to a
            culture of human rights in every community.
        </Prose>
        <BulletList
            items={[
                {
                    title: "Democratic Participation",
                    body: "In democratic and pluralistic civil societies, HRE is integral to ensuring participation in the democratic process. Citizens engage in critical thinking, decide on moral issues, and take proper courses of action guided by the fundamental values of human rights and democracy.",
                },
                {
                    title: "Informed Activism",
                    body: "HRE is critical to ensuring informed activism of individuals, non-government organizations, and people's organizations, reinforcing commitment to human rights principles and policies and strengthening civil society.",
                },
                {
                    title: "Individual Empowerment",
                    body: "HRE allows individuals to gain a sense of increased respect and control over their own lives, enabling them to make decisions that foster healthy, just, and dignified lives.",
                },
                {
                    title: "Sector Development",
                    body: "HRE allows sectors to develop. While the goal is to reach all groups (since human rights is a concern of all), key sectors are targeted because of their vulnerability as rights-holders or their responsibility as duty-bearers.",
                },
                {
                    title: "Strategic Knowledge Transfer",
                    body: "Regardless of audience, HRE is important for conjuring appropriate and strategic methods and mechanisms for the transfer of knowledge, skills, attitudes, and behaviors.",
                },
            ]}
        />

        {/* ---------- C. Goals ---------- */}
        <SectionHeading>Goals of Human Rights Education</SectionHeading>
        <Prose>
            According to the Plan of Action for the United Nations Decade for
            Human Rights Education 1995–2004, human rights education is
            directed toward the following aims:
        </Prose>
        <NumberedList
            items={[
                {
                    title: "Strengthen respect",
                    body: "For human rights and fundamental freedoms.",
                },
                {
                    title: "Fully develop human personality",
                    body: "And the sense of its dignity.",
                },
                {
                    title: "Promote understanding, tolerance, gender equality and friendship",
                    body: "Among all nations, indigenous peoples and racial, national, ethnic, religious, and linguistic groups.",
                },
                {
                    title: "Enable effective participation",
                    body: "Of all persons in a free society.",
                },
                {
                    title: "Further UN activities",
                    body: "For the maintenance of peace.",
                },
            ]}
        />
        <Prose>
            To achieve freedom, justice, and peace, concrete actions must be
            taken to address social, economic, and political problems that
            plague society. To this end, the goals of human rights education
            are twofold: <strong>to learn about human rights</strong> and{" "}
            <strong>to learn for human rights</strong>.
        </Prose>

        <SubHeading>Key Goal Areas</SubHeading>
        <BulletList
            items={[
                {
                    title: "Coalition and alliance development",
                    body: "HRE can be efficiently disseminated to a larger audience through the coordination of resources toward a common program of action. Local, regional, and international advocates can collaborate toward mutual human rights goals.",
                },
                {
                    title: "Individual empowerment",
                    body: "A set of interrelated goals associated with personal empowerment and social change — healing, community development, and social transformation — moving from spreading information to incorporating social change.",
                },
                {
                    title: "Regular and continuing education",
                    body: "Continuous efforts must be sustained, developed, and reinforced given the growing body of knowledge and the growth of populations needing information.",
                },
                {
                    title: "Ensured availability",
                    body: "Since human rights is for all, access to human rights education should also be available for all as inherent to their rights.",
                },
            ]}
        />

        <div className="mt-6">
            <InfoCard title="Looking for the three-level model?">
                The <strong>Values and Awareness</strong>,{" "}
                <strong>Accountability Formation</strong>, and{" "}
                <strong>Transformational HRE</strong> models (based on
                Tibbitts, 2002) are detailed in the{" "}
                <strong>HRE Framework</strong> tab.
            </InfoCard>
        </div>
    </div>
);

// ============ HRE Framework content ============
const HREFramework = () => (
    <div>
        <SectionHeading>
            Basic CHRE/Values and Awareness Building
        </SectionHeading>
        <Prose>
            Basic Human Rights Education (Values and Awareness Building), Being at
            the base of the pyramid (OMB, n.d.), the focus of human rights education
            in the Values and Awareness Building level is the transmission and
            integration of basic knowledge on human rights into public values
            (Tibbitts, 2000) through mediums that address the public in general. This
            is mainly done through formal schooling and public awareness campaigns,
            through its philosophical-historical approach. Its key goal is to
            &ldquo;pave the way for a world that respects human rights through an
            awareness of and commitment to the normative goals laid out in the
            Universal Declaration and other documents&rdquo; (Tibbitts, 2002, p.
            163). Among the examples associated under this goal are public
            information programs, such as public art and advertising, media
            coverage, and community events, or curriculum development and
            integration programs, such as inclusion of human rights-related
            lessons/themes in subjects and in both formal and informal youth
            programs (OMB, n.d.; Tibbitts, 2002). By encouraging mass support for
            human rights, this approach places continuous pressure upon authorities
            to protect human rights. While this approach gives little emphasis on
            the development of skills, it can help in fostering critical thinking
            in the analysis of policy issues within a human rights framework.
            Strategies used are socialization, cultural consensus, expectation
            setting for social change, and legitimization of human rights framework
            (Tibbitts, 2002).
        </Prose>

        <SectionHeading>
            Human Rights Education for Professionals (Accountability Formation)
        </SectionHeading>
        <Prose>
            Human Rights Education for Professionals (Accountability Formation).
            The next level concerning Accountability Formation focuses on the legal
            and political aspects of professional responsibility of individuals
            and/or groups in monitoring human rights violations and advocating for
            the protection of these rights. The goal is to develop and enable
            people to be responsible leaders with a rights-based perspective and
            values (OMB, n.d.) as these target groups are directly or indirectly
            associated with the guaranteeing of human rights because of their
            professional roles. These groups need to be sensitized about the nature
            and potentials of human rights violations within their respective areas
            and roles. The target audience are lawyers, civil servants, medical
            professionals, enforcement officials, judges and judicial personnel,
            journalists and other media personnel, and social service workers,
            human rights advocates and monitors, among others. At this level, the
            emphasis is on human rights training toward these specialized areas
            where learner outcomes target both content and skill development. This
            model necessitates concerted effort toward social change which can be
            achieved through identifying targets of reform at the community,
            regional, and national levels (Tibbitts, 2002).
        </Prose>

        <SectionHeading>Transformational human rights education</SectionHeading>
        <Prose>
            Transformational human rights education. The top level of the model
            entails a more psychological-sociological approach (Tibbitts, 2002) as
            it concerns individuals or groups directly impacted by human rights
            violations, vulnerable populations, and post-conflict societies. This
            model assumes that the personal and shared experiences in human rights
            violation of the target audiences will foster solidarity for them to
            become promoters and defenders of human rights themselves. The goal of
            human rights education programs at this level is to provide mechanisms
            and support systems specific to their experiences in their communities
            (OMB, n.d.). Being particular to disadvantaged sectors, this model
            promotes conscious regard for cultural and historical beliefs and
            backgrounds, political conditions, and community experiences.
            Empowerment initiatives are geared toward holistic development of
            individuals and may take the form of leadership development, conflict
            resolution training, vocation training, and work and informal
            fellowship. This model usually operates in programs seen in refugee
            camps, post-conflict societies, and groups serving the poor or victims
            of domestic abuse. However it may also be possible to attempt this in
            schools if links are made between family and school life, if an
            extensive agenda in the curriculum is laid out, and if intentional
            sustained community support is enforced (Tibbitts, 2002).
        </Prose>

        <SectionHeading>Who needs human rights education?</SectionHeading>
        <Prose>
            Human rights education is basically for all since everyone has rights.
            It is needed for active citizenship in democratic and pluralistic
            societies. Furthermore, it is essential in promoting informed activism
            especially on human rights issues. Justice and peace in societies
            depend upon citizens who are well-informed and critical of human rights
            and their violations.
        </Prose>
        <Prose>
            Local communities also need human rights education to ensure
            sensitization to human rights in everyday life situations. The goal of
            a universal culture of human rights mean that this culture is brought
            straight home to the individual lives of every member of the community.
            Human rights education is essential to a recognition of &ldquo;unrealized
            injustices and discriminations&rdquo; (Flowers et al., 2000) in local
            communities. By learning about human rights, and learning for human
            rights, individuals will be equipped to appropriately and effectively
            respond to violations found in their communities.
        </Prose>
        <Prose>
            While everyone needs human rights education, there are also groups
            where such education is more critical to ensure their protection and
            security. These are the following (Flowers et al., 2000):
        </Prose>
        <BulletList
            items={[
                {
                    title: "Young children and their parents",
                    body: "Developing attitudes about equality and human dignity should start at a young age where these attitudes are shown to be largely set. Education on and protection of human rights should begin within every home.",
                },
                {
                    title: "Teachers, principals, and educators of all kinds",
                    body: "The nature of the teaching profession is fundamentally grounded in its genuine concern for children. This will include protection and fulfillment of their human rights especially as ensconced in the Convention on the Rights of the Child. In providing education across all levels, educators must first have \u201chuman rights literacy\u201d to ensure that the design, implementation, and evaluation of programs promotes and values human rights.",
                },
                {
                    title: "Doctors and nurses, lawyers and judges, social workers, journalists, police, and military officials",
                    body: "These groups need human rights education because of their propensity and capacity to actually violate human rights given the power or positions they hold. Human rights education should thus be integral in the curriculum of professional training institutions.",
                },
                {
                    title: "Vulnerable populations",
                    body: "These groups generally include refugees, minorities, migrant workers, indigenous people, persons with disability, and the poor, among others. Human rights education should be accessible most especially to these people who are especially vulnerable to human rights abuses and violations due to a lack of knowledge and awareness of their rights and how they ought to respond.",
                },
                {
                    title: "Activists and non-profit organizations",
                    body: "While most social and economic issues brought forward by activists and non-profit organizations are related to human rights, their strategies and advocacy should be grounded in the human rights framework. Understanding these contexts are essential in ensuring that problems are adequately addressed and solidarity among these marginalized sectors is achieved.",
                },
                {
                    title: "Public office holders (elected or appointed)",
                    body: "Serving the interests of the people in a democratic society should spring from a public commitment to human rights. Regardless of the level or position held by a public official, it is essential that human rights education is known and applied by all office holders.",
                },
                {
                    title: "Power holders",
                    body: "This can range from members of business communities and religious leaders to anyone whose decision affect the lives of others. Power holders must be informed of the power that they wield and its capacity to impede or effect stability and development in communities and in the lives of people.",
                },
            ]}
        />

        <SectionHeading>References</SectionHeading>
        <div className="space-y-3 text-sm leading-relaxed text-gray-700">
            <p>
                Chauhan, A. M. (2007). Center for human rights education: Philippines.
                In Human rights education in Asian schools (pp. 107-125). Asia-Pacific
                Human Rights Information Center.{" "}
                <a
                    href="https://www.hurights.or.jp/archives/paf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#157d3c] underline hover:text-[#f5c518] break-all"
                >
                    https://www.hurights.or.jp/archives/paf
                </a>
            </p>
            <p>
                CHR (2018). Human rights advisory on the reporting of the Philippine
                government to human rights treaty bodies. Commission on Human Rights
                of the Philippines.{" "}
                <a
                    href="http://chr.gov.ph/wp-content/uploads/2018/05/Human-Rights-Advisory-on-the-Reporting-of-the-Philippine-Government-to-Human-Rights-Treaty-Bodies001.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#157d3c] underline hover:text-[#f5c518] break-all"
                >
                    http://chr.gov.ph/wp-content/uploads/2018/05/Human-Rights-Advisory-on-the-Reporting-of-the-Philippine-Government-to-Human-Rights-Treaty-Bodies001.pdf
                </a>
            </p>
            <p>
                ESCR (n.d.). International bill of human rights. International Network
                for Economic, Social &amp; Cultural Rights.{" "}
                <a
                    href="https://www.escr-net.org/resources/international-bill-human-rights"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#157d3c] underline hover:text-[#f5c518] break-all"
                >
                    https://www.escr-net.org/resources/international-bill-human-rights
                </a>
            </p>
            <p>
                Flowers, N., Bernbaum, M., Rudelius-Palmer, K., &amp; Tolman, J. (2000).
                The human rights education handbook: Effective practices for learning,
                action, and change. The Human Rights Resource Center.
            </p>
            <p>
                Office of the Ombudsman (n.d.). Human rights education system.
                Ombudsman.gov.ph.{" "}
                <a
                    href="https://www.ombudsman.gov.ph/UNDP4/wp-content/uploads/2013/01/hr-education-system.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#157d3c] underline hover:text-[#f5c518] break-all"
                >
                    https://www.ombudsman.gov.ph/UNDP4/wp-content/uploads/2013/01/hr-education-system.pdf
                </a>
            </p>
            <p>
                Ofreneo, A.E.E. (2007). Philippine Commission on Human Rights: More
                than two decades of promoting human rights in schools. In Human
                rights education in Asian schools (pp. 27-49). Asia-Pacific Human
                Rights Information Center.{" "}
                <a
                    href="https://www.hurights.or.jp/archives/pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#157d3c] underline hover:text-[#f5c518] break-all"
                >
                    https://www.hurights.or.jp/archives/pdf
                </a>
            </p>
            <p>
                OHCHR (n.d.). Plan of Action for the United Nations Decade for Human
                Rights Education, 1995-2004. Office of the High Commissioner for
                Human Rights, United Nations.{" "}
                <a
                    href="https://www.ohchr.org/en/resources/educators/human-rights-education-training/2-plan-action-united-nations-decade-human-rights-education-1995-2004-1996"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#157d3c] underline hover:text-[#f5c518] break-all"
                >
                    https://www.ohchr.org/en/resources/educators/human-rights-education-training/2-plan-action-united-nations-decade-human-rights-education-1995-2004-1996
                </a>
            </p>
            <p>
                OHCHR (n.d.). United Nations Decade for Human Rights Education 1994.
                Office of the High Commissioner for Human Rights, United Nations.{" "}
                <a
                    href="https://www.ohchr.org/en/resources/educators/human-rights-education-training/l-united-nations-decade-human-rights-education-1994"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#157d3c] underline hover:text-[#f5c518] break-all"
                >
                    https://www.ohchr.org/en/resources/educators/human-rights-education-training/l-united-nations-decade-human-rights-education-1994
                </a>
            </p>
            <p>
                OHCHR (n.d.). Vienna declaration and programme of action. Office of
                the High Commissioner for Human Rights, United Nations.{" "}
                <a
                    href="https://www.ohchr.org/en/instruments-mechanisms/instruments/vienna-declaration-and-programme-action"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#157d3c] underline hover:text-[#f5c518] break-all"
                >
                    https://www.ohchr.org/en/instruments-mechanisms/instruments/vienna-declaration-and-programme-action
                </a>
            </p>
            <p>
                OHCHR (n.d.). What are human rights? Office of the High Commissioner
                for Human Rights, United Nations.{" "}
                <a
                    href="https://www.ohchr.org/en/what-are-human-rights"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#157d3c] underline hover:text-[#f5c518] break-all"
                >
                    https://www.ohchr.org/en/what-are-human-rights
                </a>
            </p>
            <p>
                OHCHR &amp; Equitas (2011). Situating human rights education: a systems
                approach. In Evaluating human rights training activities: A handbook
                for human rights educators (Professional training series no. 18).
                Office of the United Nations High Commissioner for Human Rights
                (OHCHR) and Equitas - International Centre for Human Rights
                Education.{" "}
                <a
                    href="https://www.ohchr.org/sites/default/files/Documents/Publications/EvaluationHandbookPT18.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#157d3c] underline hover:text-[#f5c518] break-all"
                >
                    https://www.ohchr.org/sites/default/files/Documents/Publications/EvaluationHandbookPT18.pdf
                </a>
            </p>
            <p>
                Tibbitts, F. (July 2002). Understanding what we do: Emerging models
                for human rights education. International Review of Education,
                48(3/4), 159-171.{" "}
                <a
                    href="https://www.jstor.org/stable/3445358"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#157d3c] underline hover:text-[#f5c518] break-all"
                >
                    https://www.jstor.org/stable/3445358
                </a>
            </p>
            <p>
                United Nations (n.d.). Universal declaration of human rights.{" "}
                <a
                    href="https://www.un.org/en/about-us/universal-declaration-of-human-rights"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#157d3c] underline hover:text-[#f5c518] break-all"
                >
                    https://www.un.org/en/about-us/universal-declaration-of-human-rights
                </a>
            </p>
        </div>
    </div>
);

// ============ Programs & Activities content ============
const ProgramsActivities = () => (
    <div>
        <Prose>
            The Center for Human Rights Education (CHRE) carries out its mandate
            through a balanced program of education and training, research and
            advocacy, community engagement, and international cooperation —
            supported by a range of direct services for students, faculty, and
            community partners.
        </Prose>

        <SectionHeading>Program Activity Management</SectionHeading>

        {/* ---------- Education and Training ---------- */}
        <SubHeading>Education and Training</SubHeading>
        <BulletList
            items={[
                {
                    title: "Workshops and Seminars",
                    body: "Organizing workshops and seminars on various human rights topics.",
                },
                {
                    title: "Guest Lectures",
                    body: "Inviting human rights experts and activists to speak to students and faculty.",
                },
            ]}
        />

        {/* ---------- Research and Advocacy ---------- */}
        <SubHeading>Research and Advocacy</SubHeading>
        <BulletList
            items={[
                {
                    title: "Research Projects",
                    body: "Supporting faculty and students in conducting research on human rights issues.",
                },
                {
                    title: "Advocacy Campaigns",
                    body: "Organizing advocacy campaigns to promote human rights and address specific issues.",
                },
                {
                    title: "Publications",
                    body: "Publishing research papers, reports, and articles on human rights.",
                },
            ]}
        />

        {/* ---------- Community Engagement ---------- */}
        <SubHeading>Community Engagement</SubHeading>
        <BulletList
            items={[
                {
                    title: "Community Partnerships",
                    body: "Building partnerships with local organizations and communities.",
                },
                {
                    title: "Human Rights Education for Communities",
                    body: "Providing human rights education to community members.",
                },
                {
                    title: "Community-Based Research",
                    body: "Conducting research in partnership with communities.",
                },
                {
                    title: "Volunteer Programs",
                    body: "Organizing volunteer programs to support human rights initiatives.",
                },
            ]}
        />

        {/* ---------- International Cooperation ---------- */}
        <SubHeading>International Cooperation</SubHeading>
        <BulletList
            items={[
                {
                    title: "International Networks",
                    body: "Participate in international networks and collaborations.",
                },
                {
                    title: "International Conferences",
                    body: "Organize and attend international conferences on human rights.",
                },
            ]}
        />

        {/* ---------- Services ---------- */}
        <SectionHeading>Services</SectionHeading>
        <BulletList
            items={[
                {
                    title: "Human Rights Education",
                    body: "Providing comprehensive education on human rights principles, international law, and local contexts.",
                },
                {
                    title: "Research Support",
                    body: "Offering research support, including funding, mentorship, and access to resources.",
                },
                {
                    title: "Advocacy Support",
                    body: "Providing advocacy support, including training, networking, and legal assistance.",
                },
                {
                    title: "Community Linkages",
                    body: "Connecting students and faculty with community-based organizations.",
                },
                {
                    title: "Networking and Professional Development",
                    body: "Providing opportunities for networking and professional development.",
                },
                {
                    title: "Resource Center",
                    body: "Maintaining a resource center with books, articles, and other materials on human rights.",
                },
            ]}
        />
    </div>
);

// ============ Mandate & Functions content ============
const MandateFunctions = () => (
    <div>
        <SectionHeading>Mandate</SectionHeading>
        <Prose>
            The Center for Human Rights Education (CHRE) is mandated to promote and
            advance human rights awareness, understanding, and advocacy among students,
            faculty, and staff within and outside the academic community. It is
            committed to developing a culture of tolerance, respect, and
            non-discrimination through training and capacity-building workshops on
            human rights education for teaching and non-teaching personnel, students,
            and the community.
        </Prose>

        <SectionHeading>Functions</SectionHeading>
        <BulletList
            items={[
                {
                    title: "Human Rights Education",
                    body: "Provide comprehensive and accessible human rights education to students, faculty, and staff, equipping them with the knowledge and skills to understand, defend, and promote human rights.",
                },
                {
                    title: "Capacity-Building",
                    body: "Facilitate training and capacity-building workshops on human rights education for teaching and non-teaching personnel, students, and community members.",
                },
                {
                    title: "Research and Knowledge Production",
                    body: "Conduct rigorous research on human rights issues and serve as a hub for scholarship that contributes to new knowledge and innovative approaches to human rights promotion and protection.",
                },
                {
                    title: "Advocacy Support",
                    body: "Support students, faculty, and staff in engaging in human rights advocacy activities such as public speaking, community organizing, and legal advocacy.",
                },
                {
                    title: "Partnerships and Collaborations",
                    body: "Foster partnerships with other organizations and institutions working on human rights issues, both locally and internationally.",
                },
                {
                    title: "Policy Advocacy",
                    body: "Advocate for policies and practices that promote human rights at all levels, from local to international.",
                },
                {
                    title: "Cultural Understanding",
                    body: "Foster intercultural understanding and respect, recognizing the diversity of human experiences and perspectives.",
                },
                {
                    title: "Community Empowerment",
                    body: "Support community-based initiatives that promote human rights and address the needs of marginalized groups.",
                },
            ]}
        />
    </div>
);

// ============ Organizational Chart ============
const OrgChart = () => (
    <div className="w-full overflow-x-auto pb-4">
        <div className="min-w-[600px] flex flex-col items-center">
            {/* President */}
            <div className="rounded-xl border-2 border-[#157d3c] bg-[#157d3c] px-6 py-4 text-center shadow-md w-64">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#f5c518]">
                    President
                </p>
                <p className="mt-1 text-sm font-bold text-white">
                    Dr. Jestoni P. Babia
                </p>
            </div>

            {/* Vertical connector */}
            <div className="h-8 w-0.5 bg-[#157d3c]" />

            {/* VP Research and Extension */}
            <div className="rounded-xl border-2 border-[#157d3c] bg-white px-6 py-4 text-center shadow-md w-64">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#157d3c]">
                    VP for Research and Extension
                </p>
                <p className="mt-1 text-sm font-bold text-[#1a1a1a]">
                    Dr. Ray Butch D. Mabinay
                </p>
            </div>

            {/* Vertical connector */}
            <div className="h-8 w-0.5 bg-[#157d3c]" />

            {/* Director */}
            <div className="rounded-xl border-2 border-[#157d3c] bg-[#f0f7f2] px-6 py-4 text-center shadow-md w-64">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#157d3c]">
                    Director
                </p>
                <p className="mt-1 text-sm font-bold text-[#1a1a1a]">
                    Dr. Jean T. Loquillano
                </p>
                <p className="text-xs text-gray-600">
                    Center for Human Rights Education
                </p>
            </div>

            {/* Branching connector */}
            <div className="relative flex w-full justify-center">
                {/* Vertical line from director */}
                <div className="h-8 w-0.5 bg-[#157d3c]" />
            </div>

            {/* Horizontal line connecting the two coordinators */}
            <div className="relative w-full max-w-md">
                <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-[#157d3c]" />
                {/* Left vertical drop */}
                <div className="absolute top-0 left-1/4 h-8 w-0.5 bg-[#157d3c] -translate-x-1/2" />
                {/* Right vertical drop */}
                <div className="absolute top-0 right-1/4 h-8 w-0.5 bg-[#157d3c] translate-x-1/2" />
            </div>

            {/* Coordinators row */}
            <div className="mt-8 grid w-full max-w-md grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border-2 border-[#f5c518] bg-white px-4 py-4 text-center shadow-md">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#157d3c]">
                        College Coordinator
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#1a1a1a]">
                        Dr. Psyche Cambo
                    </p>
                </div>
                <div className="rounded-xl border-2 border-[#f5c518] bg-white px-4 py-4 text-center shadow-md">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#157d3c]">
                        College Coordinator
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#1a1a1a]">
                        Gemma E. Gonzales
                    </p>
                </div>
            </div>
        </div>
    </div>
);

// ============ Bionote content ============
const Bionote = () => (
    <div>
        <Prose>
            Dr. Jean T. Loquillano, PhD serves as the{" "}
            <strong>Director of the Center for Human Rights Education</strong>{" "}
            at the City College of Cagayan de Oro. In this role, she leads
            institutional initiatives aimed at integrating human rights
            principles into academic curricula, fostering inclusive learning
            environments, and empowering marginalized communities.
        </Prose>

        <Prose>
            Concurrent with her directorship, she serves as the{" "}
            <strong>Director for Research &amp; Publication</strong>, bridging
            academic inquiry with social advocacy. Dr. Loquillano is a
            dedicated educator, researcher, and institutional leader committed
            to advancing human rights pedagogy, community-engaged research, and
            transformative social development.
        </Prose>

        <Prose>
            Dedicated to ensuring accessible learning for diverse and marginalized
            populations, Dr. Loquillano drives institutional initiatives that
            promote human rights principles, gender sensitivity, and societal
            equity. Through collaborative community partnerships and grassroots
            educational outreach, she works to transform human rights concepts
            into meaningful, real-world action.
        </Prose>

        <SectionHeading>Areas of Focus</SectionHeading>
        <BulletList
            items={[
                {
                    title: "Human Rights Pedagogy",
                    body: "Integrating human rights principles into academic curricula and fostering inclusive, rights-based learning environments.",
                },
                {
                    title: "Community-Engaged Research",
                    body: "Bridging academic inquiry with social advocacy through research that responds to community needs.",
                },
                {
                    title: "Transformative Social Development",
                    body: "Empowering marginalized communities through institutional initiatives and rights-centered advocacy.",
                },
            ]}
        />
    </div>
);

// ===================== Lower Tabs Data =====================
const TABS = [
    {
        id: "about",
        label: "About CHRE",
        shortLabel: "About",
        content: <AboutCHRE />,
    },
    {
        id: "legal",
        label: "Legal Foundation",
        shortLabel: "Legal",
        content: <LegalFoundation />,
    },
    {
        id: "framework",
        label: "HRE Framework",
        shortLabel: "Framework",
        content: <HREFramework />,
    },
    {
        id: "mandate",
        label: "Mandate & Functions",
        shortLabel: "Mandate",
        content: <MandateFunctions />,
    },
    {
        id: "programs",
        label: "Programs & Activities",
        shortLabel: "Programs",
        content: <ProgramsActivities />,
    },
    {
        id: "news",
        label: "News",
        shortLabel: "News",
        content: <UnderConstruction />,
    },
];

// ===================== Upper (Director) Tabs Data =====================
const DIRECTOR_TABS = [
    {
        id: "bionote",
        label: "Bionote",
        shortLabel: "Bionote",
        content: <Bionote />,
    },
    {
        id: "general-functions",
        label: "General Functions",
        shortLabel: "General Functions",
        content: <UnderConstruction />,
    },
    {
        id: "organizational-chart",
        label: "Organizational Chart",
        shortLabel: "Org Chart",
        content: <OrgChart />,
    },
];

// ============ Banner text ============
function AnimatedBannerText({ title, description }) {
    return (
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <motion.h1
                className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                {title}
            </motion.h1>
            <motion.p
                className="mt-4 text-white/90 text-sm md:text-lg leading-relaxed drop-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.15,
                }}
            >
                {description}
            </motion.p>
        </div>
    );
}

// ============ Office Slideshow ============
function OfficeSlideshow() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SLIDES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isPaused]);

    const goTo = (index) => setCurrent(index);
    const goPrev = () =>
        setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    const goNext = () => setCurrent((prev) => (prev + 1) % SLIDES.length);

    const slide = SLIDES[current];

    return (
        <motion.div
            className="mt-14 md:mt-20 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Section heading */}
            <div className="border-b border-gray-200 bg-[#f0f7f2] px-6 sm:px-8 md:px-10 lg:px-14 py-6 text-center">
                <h2 className="m-0 text-2xl md:text-3xl font-extrabold text-[#1a1a1a] tracking-tight">
                    Our{" "}
                    <span className="text-[#157d3c]">Center</span>
                </h2>
                <div className="w-16 h-1 bg-[#f5c518] rounded-full mt-3 mx-auto" />
                <p className="mt-3 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
                    Take a look inside the Center for Human Rights Education —
                    a space dedicated to promoting rights awareness, advocacy,
                    and education.
                </p>
            </div>

            <div
                className="relative w-full overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Slides */}
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide.id}
                            className="absolute inset-0"
                            initial={{ opacity: 0, scale: 1.03 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.opacity = "0";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Prev / Next buttons */}
                    <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous slide"
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-[#157d3c] focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next slide"
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-[#157d3c] focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>

                    {/* Counter */}
                    <div className="absolute top-4 right-4 z-20 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                        {current + 1} / {SLIDES.length}
                    </div>
                </div>

                {/* Text content below the image */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={slide.id}
                        className="px-6 sm:px-8 md:px-10 lg:px-14 py-8 md:py-10 text-center md:text-left"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h3 className="m-0 mb-3 text-xl md:text-2xl font-extrabold text-[#1a1a1a] tracking-tight">
                            {slide.title}
                        </h3>
                        <div className="w-12 h-1 bg-[#f5c518] rounded-full mb-4 mx-auto md:mx-0" />
                        <p className="text-justify md:text-left leading-relaxed text-gray-700 max-w-3xl">
                            {slide.description}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Dots */}
                <div className="pb-6 flex items-center justify-center gap-2">
                    {SLIDES.map((s, i) => (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                                i === current
                                    ? "w-8 bg-[#157d3c]"
                                    : "w-2.5 bg-gray-300 hover:bg-[#f5c518]"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function CHRE() {
    const [activeTab, setActiveTab] = useState(TABS[0].id);
    const [activeDirectorTab, setActiveDirectorTab] = useState(DIRECTOR_TABS[0].id);

    const tabStripRef = useRef(null);

    useEffect(() => {
        document.title =
            "Center for Human Rights Education - City College of Cagayan de Oro";
    }, []);

    useEffect(() => {
        const el = tabStripRef.current;
        if (!el) return;
        const activeEl = el.querySelector(`#tab-${activeTab}`);
        if (activeEl) {
            activeEl.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        }
    }, [activeTab]);

    const activeTabData = TABS.find((t) => t.id === activeTab);
    const activeDirectorTabData = DIRECTOR_TABS.find((t) => t.id === activeDirectorTab);

    const tabContent = activeTabData.content;

    const getDirectorTabHeading = (tabId) => {
        switch (tabId) {
            case "bionote":
                return (
                    <>
                        Bio <span className="text-[#157d3c]">Note</span>
                    </>
                );
            case "general-functions":
                return (
                    <>
                        General <span className="text-[#157d3c]">Functions</span>
                    </>
                );
            case "organizational-chart":
                return (
                    <>
                        Organizational <span className="text-[#157d3c]">Chart</span>
                    </>
                );
            default:
                return activeDirectorTabData?.label || "";
        }
    };

    return (
        <MainLayout
            maxWidth="full"
            containerClassName="px-0"
            mainClassName="py-0"
            className="overflow-hidden pb-0"
        >
            <style>{`
                .chre-tab-strip::-webkit-scrollbar {
                    display: none;
                    width: 0;
                    height: 0;
                }
                .chre-tab-strip {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* ==================== BANNER ==================== */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat shadow-lg min-h-[350px] md:min-h-[450px] lg:min-h-[550px] flex items-center justify-center"
                style={{
                    backgroundImage: `url('${chreBannerImg}')`,
                }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <AnimatedBannerText
                    title="Center for Human Rights Education"
                    description="Promoting human rights awareness, advocacy, and education — fostering a culture of respect, dignity, and equality."
                />
            </div>


            {/* ==================== MAIN CONTENT ==================== */}
            <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-10 lg:px-16 xl:px-20 py-14 md:py-20">
                <motion.div
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex flex-col md:flex-row gap-10 lg:gap-14 p-8 md:p-10 lg:p-14 items-start">
                        {/* ================= LEFT COLUMN: Image + Contact Us ================= */}
                        <div className="w-full shrink-0 md:w-80 lg:w-96 mx-auto md:mx-0 flex flex-col gap-8">
                            {/* Director Image */}
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                {/* Image */}
                                <div className="w-full aspect-[4/5] flex items-center justify-center bg-white p-2">
                                    <img
                                        src={jeanLoquillanoImg}
                                        alt="Dr. Jean T. Loquillano"
                                        className="h-full w-full object-contain"
                                        onError={(e) => {
                                            e.currentTarget.style.opacity = "0";
                                        }}
                                    />
                                </div>

                                {/* Name + Position panel */}
                                <div className="border-t-4 border-[#f5c518] bg-white px-4 py-4 text-center">
                                    <p className="m-0 text-sm sm:text-base md:text-lg font-bold tracking-wide uppercase text-[#157d3c]">
                                        Dr. Jean T. Loquillano
                                    </p>
                                    <p className="mt-1 text-xs sm:text-sm md:text-base font-semibold text-[#1a1a1a] leading-tight">
                                        Director, Center for Human Rights Education
                                    </p>
                                </div>
                            </div>

                            {/* ===== Contact Us — below the director image ===== */}
                            <div className="rounded-xl border border-[#157d3c] bg-[#157d3c] p-6 shadow-sm">
                                <div className="flex flex-col items-start text-left mb-5">
                                    <h3 className="m-0 text-lg font-extrabold text-white tracking-tight">
                                        Contact{" "}
                                        <span className="text-[#f5c518]">
                                            Us
                                        </span>
                                    </h3>
                                    <div className="w-12 h-1 bg-[#f5c518] rounded-full mt-2" />
                                </div>

                                <ul className="space-y-3.5 text-sm text-white">
                                    <li className="flex items-start gap-2.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#f5c518"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-4 h-4 mt-0.5 shrink-0"
                                        >
                                            <path d="M3 21h18" />
                                            <path d="M5 21V7l7-4 7 4v14" />
                                            <path d="M9 9h.01" />
                                            <path d="M9 12h.01" />
                                            <path d="M9 15h.01" />
                                            <path d="M15 9h.01" />
                                            <path d="M15 12h.01" />
                                            <path d="M15 15h.01" />
                                        </svg>
                                        <span>
                                            <strong>Office:</strong> Center for
                                            Human Rights Education, City College
                                            of Cagayan de Oro
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#f5c518"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-4 h-4 mt-0.5 shrink-0"
                                        >
                                            <rect
                                                width="20"
                                                height="16"
                                                x="2"
                                                y="4"
                                                rx="2"
                                            />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                        <span>
                                            <strong>Email:</strong>{" "}
                                        
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#f5c518"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-4 h-4 mt-0.5 shrink-0"
                                        >
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                        </svg>
                                        <span>
                                            <strong>Phone:</strong> 
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* ================= RIGHT COLUMN: Tabs on top, then Content ================= */}
                        <div className="flex-1 w-full">
                            {/* ===== Upper Tab Switcher — at the top of the content area ===== */}
                            <div className="-mx-8 md:-mx-10 lg:-mx-14 -mt-8 md:-mt-10 lg:-mt-14 mb-8 border-b border-gray-200 bg-[#f0f7f2]">
                                <div
                                    role="tablist"
                                    aria-label="Director information tabs"
                                    className="flex w-full items-stretch overflow-x-auto"
                                >
                                    {DIRECTOR_TABS.map((tab) => {
                                        const isActive = activeDirectorTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                role="tab"
                                                id={`director-tab-${tab.id}`}
                                                aria-selected={isActive}
                                                aria-controls={`director-panel-${tab.id}`}
                                                onClick={() => setActiveDirectorTab(tab.id)}
                                                className={`relative flex-1 shrink-0 px-6 py-5 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 focus:outline-none ${
                                                    isActive
                                                        ? "text-white bg-[#157d3c]"
                                                        : "text-gray-600 bg-transparent hover:bg-[#f5c518] hover:text-[#1a1a1a]"
                                                }`}
                                            >
                                                <span className="hidden lg:inline">
                                                    {tab.label}
                                                </span>
                                                <span className="lg:hidden">
                                                    {tab.shortLabel}
                                                </span>

                                                {isActive && (
                                                    <motion.span
                                                        layoutId="activeDirectorTabIndicator"
                                                        className="absolute bottom-0 left-0 right-0 h-1 bg-[#f5c518] rounded-t-full"
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 380,
                                                            damping: 30,
                                                        }}
                                                    />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* ===== Tab Panel ===== */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeDirectorTab}
                                    role="tabpanel"
                                    id={`director-panel-${activeDirectorTab}`}
                                    aria-labelledby={`director-tab-${activeDirectorTab}`}
                                    variants={tabPanelVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <h2 className="m-0 mb-4 text-2xl md:text-3xl font-extrabold text-[#1a1a1a] tracking-tight text-center">
                                        {getDirectorTabHeading(activeDirectorTab)}
                                    </h2>

                                    <div className="w-16 h-1 bg-[#f5c518] rounded-full mb-6 mx-auto" />

                                    {activeDirectorTabData.content}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* ==================== OFFICE SLIDESHOW ==================== */}
                <OfficeSlideshow />

                {/* ==================== LOWER TABS SECTION ==================== */}
                <motion.div
                    className="mt-14 md:mt-20 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Tab Header Bar */}
                    <div className="border-b border-gray-200 bg-[#f0f7f2]">
                        <div
                            ref={tabStripRef}
                            role="tablist"
                            aria-label="Center for Human Rights Education sections"
                            className="chre-tab-strip flex w-full items-stretch overflow-x-auto"
                        >
                            {TABS.map((tab) => {
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        role="tab"
                                        id={`tab-${tab.id}`}
                                        aria-selected={isActive}
                                        aria-controls={`panel-${tab.id}`}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`relative flex-1 shrink-0 px-6 py-5 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 focus:outline-none ${
                                            isActive
                                                ? "text-white bg-[#157d3c]"
                                                : "text-gray-600 bg-transparent hover:bg-[#f5c518] hover:text-[#1a1a1a]"
                                        }`}
                                    >
                                        <span className="hidden lg:inline">
                                            {tab.label}
                                        </span>
                                        <span className="lg:hidden">
                                            {tab.shortLabel}
                                        </span>

                                        {isActive && (
                                            <motion.span
                                                layoutId="activeTabIndicator"
                                                className="absolute bottom-0 left-0 right-0 h-1 bg-[#f5c518] rounded-t-full"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 380,
                                                    damping: 30,
                                                }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tab Panel */}
                    <div className="p-8 md:p-10 lg:p-14 min-h-[260px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                role="tabpanel"
                                id={`panel-${activeTab}`}
                                aria-labelledby={`tab-${activeTab}`}
                                variants={tabPanelVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <h3 className="m-0 mb-2 text-xl md:text-2xl font-extrabold text-[#1a1a1a] tracking-tight">
                                    {activeTabData.label}
                                </h3>
                                <div className="w-16 h-1 bg-[#f5c518] rounded-full mb-6" />
                                {tabContent}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </MainLayout>
    );
}