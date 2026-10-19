import { useRef, useState } from "react";

import { team, type TeamMember } from "../../data/team";
import { format } from "../../i18n/format";
import { useCopy } from "../../i18n/useCopy";
import { Arrow } from "../ui/Arrow";
import { Button } from "../ui/Button";
import { Heading } from "../ui/Heading";

function MemberThumb({
  person,
  index,
  selected,
  onSelect,
}: {
  person: TeamMember;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const copy = useCopy("team");

  return (
    <Button
      ariaLabel={format(copy.aria.select, { name: person.name })}
      className={`member-thumb ${selected ? "selected" : ""}`}
      key={person.name}
      onClick={onSelect}
    >
      <span className="thumb-image">
        <img src={person.image} alt="" />
      </span>
      <span className="thumb-name">{person.name.split(" ")[0]}</span>
    </Button>
  );
}

function MemberPortrait({ member }: { member: TeamMember }) {
  const copy = useCopy("team");
  const text = copy.items[member.id];

  return (
    // The key below is inert here (a single child is reconciled by position, not
    // key). It is kept verbatim so the portrait-in animation does not begin
    // replaying on member change. Do not lift it onto the component call.
    <div className={`team-portrait portrait-theme-${member.theme}`} key={member.name}>
      <div className="portrait-shape portrait-shape-one" />
      <div className="portrait-shape portrait-shape-two" />
      <img
        src={member.image}
        alt={format(copy.aria.portrait, {
          name: member.name,
          role: text.role,
        })}
      />
      <div className="portrait-caption">
        <div>
          <strong>{member.name}</strong>
          <span>{text.role}</span>
        </div>
        <p>{text.note}</p>
      </div>
    </div>
  );
}

export function Team() {
  const [memberIndex, setMemberIndex] = useState(0);
  const thumbRow = useRef<HTMLDivElement>(null);
  const copy = useCopy("team");
  const member = team[memberIndex];
  const text = copy.items[member.id];

  function stepMember(amount: number) {
    setMemberIndex((current) => (current + amount + team.length) % team.length);
    thumbRow.current?.scrollBy({ left: amount * 120, behavior: "smooth" });
  }

  return (
    <section className="team-section" id="team">
      <div className="team-layout shell-wide">
        <div className="team-content reveal">
          <div className="section-label label-dark">
            <span>02</span>
            <span>{copy.sectionLabel}</span>
          </div>
          <Heading as="h2">{copy.heading}</Heading>
          <p className="team-intro">{copy.intro}</p>
          <div className="team-ctas">
            <Button className="angle-button angle-primary">
              {format(copy.learnAbout, { firstName: member.name.split(" ")[0] })}{" "}
              <Arrow />
            </Button>
            <Button className="angle-button angle-outline">
              {copy.viewAll} <Arrow />
            </Button>
          </div>
          <div className="member-strip" ref={thumbRow}>
            {team.map((person, index) => (
              <MemberThumb
                index={index}
                key={person.name}
                onSelect={() => setMemberIndex(index)}
                person={person}
                selected={index === memberIndex}
              />
            ))}
          </div>
          <div className="team-navigation">
            <div className="arrow-controls">
              <Button
                ariaLabel={copy.aria.previous}
                className="round-control"
                onClick={() => stepMember(-1)}
              >
                <Arrow direction="left" />
              </Button>
              <Button
                ariaLabel={copy.aria.next}
                className="round-control"
                onClick={() => stepMember(1)}
              >
                <Arrow />
              </Button>
            </div>
            <span>
              {String(memberIndex + 1).padStart(2, "0")} /{" "}
              {String(team.length).padStart(2, "0")}
            </span>
          </div>
        </div>
        <MemberPortrait member={member} />
      </div>
    </section>
  );
}
