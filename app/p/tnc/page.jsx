import NotFound from "@/app/not-found";
import { getStandardPagesContent } from "@/lib/hygraph";
import Link from "next/link";

const Page = async () => {
  const standardPages = await getStandardPagesContent();
  console.log("Standard Pages Content: ", standardPages);
  if (
    !standardPages ||
    !standardPages.termsConditions ||
    !standardPages.termsConditions.html
  ) {
    return (
      <p>
        <NotFound />
      </p>
    );
  }
  return (
    <>
      <section className="w-full h-auto bg-[#eaeaf5] items-center justify-center py-0 flex flex-col md:flex-row gap-[20px]">
        <div className="claracontainer px-4 md:px-2 lg:px-4 pb-24 pt-8 w-full bg-[#eaeaf5] flex flex-col overflow-hidden gap-8">
          <div className="flex flex-col w-full gap-4 justify-center items-center">
            <div className="w-full text-center">
              <span className="text-[#3f3a64] claraheading uppercase">
                Terms
              </span>{" "}
              <span className="text-red claraheading uppercase"> And</span>{" "}
              <span className="text-[#3f3a64] claraheading uppercase">
                {" "}
                Condition
              </span>
            </div>
            <hr className="text-[#3f3a64] h-[2px]" />
          </div>
          <div className="items-center w-full justify-center flex flex-col gap-4">
            {standardPages?.termsConditions?.html ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: standardPages.termsConditions.html,
                }}
              />
            ) : (
              <p>No content found</p>
            )}
          </div>
          {/* <div className="items-center w-full justify-center flex flex-col gap-4">
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Overview
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                These terms outline the use of our subscription services. By
                subscribing, you agree to follow these guidelines. Please review
                them carefully before signing up for a monthly or yearly plan. 
                <br />
                The website and app are managed by Kindi. In these terms, &quot;we,&quot;
                &quot;our,&quot; and &quot;us&quot; refer to Kindi. These conditions govern your use
                of our website, app, and services as provided by Kindi. Our
                platform offers educational play activities designed for
                parents, caregivers, and professionals to replicate with
                children. By accessing or using our website or app, you
                acknowledge that you have read, understood, and agree to these
                terms.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Introduction
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Our suggestions are not intended to replace professional medical
                advice. If you have any concerns or questions about your or your
                child&apos;s health or well-being, please consult a healthcare
                professional. On Kindi, we emphasise that all play and
                activities require adult supervision at all times. By trying any
                of the activities at home, you agree to the following:
                <ol className="list-disc px-4 py-2">
                  <li>
                    You are responsible for providing constant adult supervision
                    for your child/children, either by yourself or another
                    responsible adult, when engaging in any activities from
                    Kindi.
                  </li>
                  <li>
                    You are responsible for thoroughly reading the full activity
                    description and determining whether your child is
                    developmentally ready and whether the activity is
                    appropriate for their age, using your best judgment.
                  </li>
                  <li>
                    Kindi is not liable for any accidents, injuries, allergic
                    reactions, or other harm that may occur while replicating
                    activities from the platform. You assume full responsibility
                    for safety during any activities, emphasising the need for
                    careful supervision and judgment.
                  </li>
                  <li>
                    Kindi is not liable for any developmental delays that your
                    child/children may develop throughout your subscription
                    period.
                  </li>
                  <li>
                    By signing up for Kindi, you acknowledge and agree to these
                    terms, forming a legally binding agreement.
                  </li>
                </ol>
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Subscription Plans
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We offer the following subscription options: <br />
                <span className="font-bold"> Monthly Subscription: </span>{" "}
                Charged on the day you subscribe and renews automatically each
                month on the same day. <br />
                <span className="font-bold">Yearly Subscription: </span>Charged
                on the day you subscribe and renews automatically every 12
                months on the same day.
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Payment and Billing
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                <span className="font-bold"> Payment Methods:</span> We accept
                credit cards, debit cards, and PayPal. By providing your payment
                details, you authorise us to charge the applicable subscription
                fees to your chosen payment method. <br />
                <span className="font-bold">Billing Cycle:</span> Your billing
                cycle starts on the day you subscribe, and payments are charged
                automatically based on your subscription plan (monthly or
                yearly). <br />
                <span className="font-bold">Failed Payments:</span> If a payment
                fails, we will attempt to charge your payment method again. If
                payment is not received, we reserve the right to suspend or
                terminate your access to the service.
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Automatic Renewal
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Your subscription will renew automatically at the end of each
                billing cycle unless cancelled prior to the renewal date. By
                agreeing to these terms, you authorise us to charge the
                applicable renewal fees to your payment method.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Cancellation Policy
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                You can cancel your subscription at any time via your account
                settings or by contacting our customer service team. <br />
                <span className="font-bold">Monthly Subscriptions:</span>{" "}
                Cancellations will take effect at the end of your current
                billing period, and you will retain access until that date.{" "}
                <br />
                <span className="font-bold"> Yearly Subscriptions:</span>{" "}
                Cancellations will also take effect at the end of your billing
                period, and you will have access for the remainder of the
                current subscription year. No partial refunds will be issued for
                cancellations before the end of a billing cycle.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Refund Policy
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We do not offer refunds for monthly or yearly subscriptions,
                including for unused portions of the subscription period.
                However, if you believe you were charged in error, please
                contact us within 7 days of the charge, and we will review your
                request.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Modifications to Service and Pricing
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We reserve the right to modify the service, including features
                and pricing. Any price changes for existing subscriptions will
                be communicated in advance, and you will have the option to
                cancel if you do not agree to the new rates.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Access to Content
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                As a subscriber, you have access to our content, which may
                include downloadable materials, digital resources, and other
                benefits depending on the subscription level. You agree not to
                share your login details or distribute any of the content
                without our written permission.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                User Responsibilities
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                You agree to use the service in accordance with applicable laws
                and these terms. You are responsible for maintaining the
                confidentiality of your account and for any activity that occurs
                under your account.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Intellectual Property Rights
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                All content provided through the service, including but not
                limited to digital printables, activity guides, text, graphics,
                logos, images, and software, is the intellectual property of
                Kindi. You may not copy, reproduce, distribute, or create
                derivative works from any of the content without our prior
                written consent. Unauthorised use of our content may result in
                termination of your subscription.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Printables and Digital Materials
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Subscribers have access to download printables, worksheets, and
                other digital resources. These printables are for personal use
                only and may not be shared, resold, or distributed without
                permission. Any misuse or unauthorised distribution of
                printables may result in termination of your subscription.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Third-Party Links
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Our website and app may contain links to third-party websites or
                services. We are not responsible for the content, accuracy, or
                practices of these third-party sites. Accessing third-party
                links is at your own risk, and we encourage you to review their
                terms and privacy policies.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Promotional Materials
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                By subscribing, you agree to receive promotional materials,
                newsletters, and updates from Kindi. Any promotional discounts
                or special offers will be subject to the terms provided at the
                time of the promotion. You can opt-out of promotional emails at
                any time by clicking the unsubscribe link in any of our
                communications or by adjusting your communication preferences in
                your account settings.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Accuracy of Information
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We strive to provide accurate, up-to-date information, but we do
                not warrant that the content will be error-free, complete, or
                current. We reserve the right to modify or update information
                without prior notice. You agree that it is your responsibility
                to review any changes to these terms.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                User Comments, Feedback, and Submissions
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                By submitting comments, feedback, suggestions, or other content
                (submissions) to us, you grant us a non-exclusive, royalty-free,
                worldwide license, perpetual, and irrevocable right to use,
                reproduce, modify, and publish those submissions for any purpose
                related to the service. You agree that your submissions will not
                infringe any third-party rights or contain unlawful material. We
                are not responsible for user-generated content and we reserve
                the right to remove any submissions that violate these terms.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Backups
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We make reasonable efforts to back up the content and data on
                our platform, but we do not guarantee that any information or
                files you upload will be backed up. You are responsible for
                maintaining backups of any important content or data you store
                on our platform.
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Indemnification
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                You agree to indemnify, defend, and hold Kindi, its affiliates,
                and its respective directors, officers, employees, and agents
                harmless from any claims, damages, liabilities, costs, and
                expenses (including reasonable legal fees) arising from your use
                of the service, your violation of these terms, or your
                infringement of any third-party rights.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Limitation of Liability
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                To the maximum extent permitted by law, Kindi shall not be
                liable for any indirect, incidental, special, or consequential
                damages arising from your use of the service, even if advised of
                the possibility of such damages.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Online Website and App Terms
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                Your use of our website and app is governed by these terms and
                any additional policies posted on the website or app. You agree
                to follow all applicable laws and regulations while using the
                service, and you are responsible for any activity conducted
                through your account. We reserve the right to update these
                policies at any time, and continued use of the website or app
                after such updates constitutes acceptance of the changes.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Severability
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                If any provision of these Terms is found to be unlawful, void,
                or unenforceable, the remaining provisions shall continue in
                full force and effect. Any unenforceable part of these Terms
                shall be modified to reflect the parties&apos; original intent as
                closely as possible.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Retaining Rights
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We reserve the right to retain any and all rights, title, and
                interest in the service and its content, including intellectual
                property rights, even after a subscription is cancelled or
                terminated. We reserve the right to modify, suspend, or
                terminate access to the service or content at our discretion.
                This includes the right to update or discontinue specific
                features or subscriptions without prior notice. Subscribers will
                be informed of significant changes in advance.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Termination
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We reserve the right to terminate or suspend your access to the
                service if you violate these terms, fail to make payment, or
                engage in any misuse of the service. No refunds will be issued
                in the event of termination for cause.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Changes to Terms
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                We may update these terms from time to time. If we make
                significant changes, we will notify you by email and/or through
                a notification within the service. Your continued use of the
                service after such changes indicates your acceptance of the
                revised terms.
                <br />
              </span>
            </div>
            <div className="w-full justify-start items-start gap-2 flex flex-col">
              <span className="text-red text-[23px] font-semibold font-fredoka leading-[25px]">
                Contact Information
              </span>
              <span className="text-[#3f3a64] text-base font-normal font-fredoka leading-tight">
                If you have any questions about these terms, your subscription,
                or need assistance, please contact us via our website
                <Link
                  href="/p/contact-us"
                  className="font-semibold uppercase text-red"
                >
                  {" "}
                  contact form.
                </Link>
                <br />
                By subscribing to our service, you acknowledge that you have
                read, understood, and agree to these terms and conditions.
              </span>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Page;
