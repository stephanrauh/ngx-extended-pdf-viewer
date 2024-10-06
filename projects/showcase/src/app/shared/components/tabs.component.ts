import { Component, signal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'pvs-tabs',
  standalone: true,
  imports: [NgClass],
  template: `
    <div role="tablist" class="min-w-full">
      <button
        id="tab-1"
        type="button"
        role="tab"
        aria-controls="tabpanel-1"
        [ngClass]="{ 'text-primary-variant-light': activeTab() === 'tab-1' }"
        [attr.tabindex]="activeTab() === 'tab-2' ? '0' : '-1'"
        [attr.aria-selected]="activeTab() === 'tab-1'"
        (click)="onChangeTab('tab-1')"
      >
        <span>Tab 1</span>
      </button>
      <button
        id="tab-2"
        type="button"
        role="tab"
        aria-controls="tabpanel-2"
        [ngClass]="{ 'text-primary-variant-light': activeTab() === 'tab-2' }"
        [attr.tabindex]="activeTab() === 'tab-2' ? '0' : '-1'"
        [attr.aria-selected]="activeTab() === 'tab-2'"
        (click)="onChangeTab('tab-2')"
      >
        <span>Tab 2</span>
      </button>
    </div>
    <div id="tabpanel-1" role="tabpanel" tabindex="0" aria-labelledby="tab-1" [ngClass]="{ hidden: activeTab() === 'tab-1' }">
      <p>Tab 1 content</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci aliquid assumenda, explicabo facere fugit ipsum molestias nam obcaecati, quaerat
        recusandae tempore ut. Eius ex fuga fugiat magnam similique. Ab adipisci aliquam atque aut consequatur cupiditate debitis dicta enim eum fugit incidunt,
        inventore ipsam iure laboriosam quibusdam ratione sed tempora veritatis vitae voluptates. Aperiam architecto, aut deleniti dolorem doloremque
        exercitationem explicabo fugiat illo illum labore laudantium maxime mollitia nam, nesciunt nostrum, pariatur perspiciatis quia rem repellendus similique
        tempore tenetur unde velit veritatis voluptates. Adipisci animi aperiam autem doloribus enim impedit labore non quam reiciendis sint, soluta temporibus
        totam, ullam velit.
      </p>
    </div>
    <div id="tabpanel-2" role="tabpanel" tabindex="0" aria-labelledby="tab-2" [ngClass]="{ hidden: activeTab() === 'tab-2' }">
      <p>Tab 2 content</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid cumque dolorem officia possimus? Accusamus alias, aliquam consequatur deleniti dolor
        eligendi facilis harum ipsam laborum nemo neque porro quibusdam. Aut consequatur corporis cupiditate debitis deleniti ducimus earum eius error ipsa
        ipsum laboriosam laudantium magni maxime nesciunt non nostrum, obcaecati perspiciatis porro quidem quod quos ratione recusandae rem sint veniam
        voluptatem voluptates. A accusantium culpa, dicta dolorem enim minus modi odit optio praesentium quam repellat sequi tempora tempore tenetur veritatis.
        Assumenda dicta, distinctio dolorum enim fuga iure molestias nemo placeat suscipit? Aliquid assumenda, consequatur cum dicta dolore eius incidunt ipsam
        iure laboriosam, modi necessitatibus non officiis quidem repudiandae sequi soluta, suscipit. Accusantium adipisci autem cupiditate dicta distinctio
        dolor ea fuga, fugit id impedit mollitia nostrum nulla obcaecati provident quidem, reiciendis reprehenderit, tenetur veniam vitae voluptatem. A
        accusamus aliquam amet asperiores blanditiis commodi consequatur consequuntur debitis eum explicabo fuga laborum magni minima molestias necessitatibus
        odit omnis quam quas, qui quidem quo quos rem reprehenderit repudiandae saepe sed sunt ullam unde vel voluptate! A cumque dolorem doloribus esse hic
        minima modi nemo, nobis perspiciatis porro quidem quisquam ratione rem sed temporibus, tenetur unde ut vitae, voluptates voluptatibus. Animi autem
        blanditiis cumque doloribus enim eveniet facere facilis id numquam, quibusdam repellendus totam. Aliquam aperiam aspernatur blanditiis dolores ducimus
        eaque eligendi eos esse est et fugiat incidunt iste labore modi molestiae obcaecati odio odit officiis, perspiciatis quibusdam quisquam quod quos
        repellat sint sit ut vitae? Commodi error maxime porro reprehenderit vero? A accusamus adipisci animi aut autem beatae commodi cum doloremque dolorum
        ducimus ea eius et eum exercitationem impedit ipsa ipsam iusto magnam magni maxime minus modi mollitia nisi non officiis, possimus qui quisquam quod
        quos repellendus repudiandae sequi unde voluptates? Adipisci aspernatur consequuntur cupiditate debitis dolores expedita fugit in iste laudantium
        maiores minus nam pariatur perspiciatis placeat, quasi qui totam. Aut ex modi nobis odio repellendus tempora, vero vitae. Ad architecto consequatur
        consequuntur culpa dolorum earum, error eum eveniet excepturi explicabo impedit laudantium magni modi nesciunt non quam qui quo repellat repudiandae,
        totam? A beatae blanditiis, dicta distinctio dolore doloremque, dolores excepturi facilis hic inventore labore molestiae nisi non nostrum obcaecati
        officia porro praesentium provident quas quia, quisquam repellat tenetur voluptatum. Assumenda, consectetur est fuga fugiat incidunt perferendis quaerat
        quam quos ratione voluptas. Aliquam autem beatae deleniti eaque eius expedita iusto, magni maiores maxime nobis nulla, quisquam ratione repellendus
        similique tempora. Amet architecto at aut commodi culpa dolores doloribus dolorum eius ex fugit itaque magni minima minus nobis, numquam odio odit,
        officiis, perferendis praesentium quo quod sed sit sunt tempora vero voluptatem voluptatibus. Ab animi asperiores aspernatur corporis culpa cumque
        cupiditate dolore dolorem doloremque eos est exercitationem fugit illo illum incidunt labore modi molestias nulla numquam possimus quia ratione
        reprehenderit rerum sapiente sed sequi sint, ullam vel velit voluptas. Dolores exercitationem iure laudantium nemo voluptate! Architecto distinctio
        eligendi laudantium provident quos? Adipisci aut autem dolorem eos harum illum itaque nulla obcaecati pariatur quaerat quo sint vel, velit! Accusantium
        culpa, delectus dicta ipsam minima nam quisquam similique unde. Aliquam animi aperiam aut deleniti hic quam recusandae repellat, tenetur! Ad aliquam
        aspernatur deleniti deserunt dolor dolore doloremque doloribus est laboriosam magni, natus necessitatibus non nulla obcaecati porro provident quaerat
        similique sit vel veniam! Aperiam assumenda delectus deleniti doloremque, eaque esse facere, harum hic inventore iusto modi nulla, ratione voluptatem.
        Accusantium ad alias beatae deleniti dolor ducimus excepturi iusto perferendis repellat velit! Aperiam asperiores doloribus ea earum ex fugiat harum hic
        incidunt iste molestias nemo nesciunt nihil nulla omnis quidem, suscipit tempora veniam? Consequuntur deleniti esse illo, incidunt nemo, nisi nobis
        optio possimus provident reiciendis repudiandae sequi. Asperiores blanditiis eaque eos eum facere maxime minima molestiae natus quasi quos recusandae
        repudiandae sapiente sequi soluta ut vero, voluptate! Corporis cum doloribus enim est eum explicabo facilis harum ipsam, nesciunt nobis ratione vel
        voluptatibus? Dolor, laudantium, tenetur! Ab adipisci aliquam aspernatur consequuntur, dolorem eius eligendi eveniet hic ipsam laudantium molestiae non
        nostrum nulla numquam perferendis placeat porro recusandae repellat reprehenderit sapiente sed sunt tempore ut. Adipisci, aliquid aperiam aspernatur
        atque autem commodi cumque deleniti dolorem earum enim error est et facere fuga hic iusto laudantium, minus obcaecati omnis quisquam ratione reiciendis
        rem repellat repudiandae sit, ullam veritatis voluptates? Alias aperiam autem culpa cumque ea facere, nobis, nostrum numquam obcaecati odit, officia
        placeat quibusdam quisquam quo rem sequi tempore velit veniam! Nam pariatur, vero. Adipisci amet, aspernatur dicta dignissimos eligendi enim error
        pariatur repudiandae rerum saepe tenetur ullam veritatis voluptas. Aspernatur cumque est eveniet fugit non, similique vero? Animi culpa facilis ipsa
        quae ratione. A ab aliquam asperiores culpa debitis delectus, dolorem ducimus ea earum, eos eveniet excepturi harum incidunt ipsa libero magnam maxime
        minima non nulla optio perferendis possimus quae qui quidem quo temporibus ut veniam vitae voluptas voluptate. Asperiores, blanditiis doloremque eum ex
        fuga incidunt quas quibusdam tempora tenetur.
      </p>
    </div>
  `,
  styles: ``,
})
export class TabsComponent {
  activeTab = signal('');

  onChangeTab(tabId: string) {
    this.activeTab.set(tabId);
  }
}
