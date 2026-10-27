/* Topic 4.5 · Pesticide Master Guide — interactive behaviour for this topic's content. */

const pesticideByZone = {
      red: [
        { value: 'chlorpyrifos', label: 'Chlorpyrifos' },
        { value: 'carbendazim', label: 'Carbendazim (MBC)' },
        { value: 'eto', label: 'ETO (Ethylene Oxide)' }
      ],
      yellow: [
        { value: 'imidacloprid', label: 'Imidacloprid' },
        { value: 'lambda', label: 'Lambda-cyhalothrin' }
      ],
      green: [
        { value: 'azoxystrobin', label: 'Azoxystrobin' },
        { value: 'chlorantraniliprole', label: 'Chlorantraniliprole' },
        { value: 'spinosad', label: 'Spinosad' },
        { value: 'flonicamid', label: 'Flonicamid' }
      ]
    };

    const zoneSelect = document.getElementById('zone-select');
    const pesticideSelect = document.getElementById('pesticide-select');
    const placeholder = document.getElementById('pesticide-placeholder');
    const allSlots = document.querySelectorAll('.compound-slot');

    function hideAllSlots() {
      allSlots.forEach(slot => { slot.style.display = 'none'; });
    }

    zoneSelect.addEventListener('change', () => {
      const zone = zoneSelect.value;
      hideAllSlots();
      placeholder.style.display = 'block';

      pesticideSelect.innerHTML = '';
      if (!zone) {
        pesticideSelect.disabled = true;
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = '— ముందుగా Zone ఎంచుకోండి —';
        pesticideSelect.appendChild(opt);
        return;
      }

      pesticideSelect.disabled = false;
      const defaultOpt = document.createElement('option');
      defaultOpt.value = '';
      defaultOpt.textContent = '— Pesticide ఎంచుకోండి —';
      pesticideSelect.appendChild(defaultOpt);

      pesticideByZone[zone].forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.value;
        opt.textContent = p.label;
        pesticideSelect.appendChild(opt);
      });
    });

    pesticideSelect.addEventListener('change', () => {
      const value = pesticideSelect.value;
      hideAllSlots();

      if (!value) {
        placeholder.style.display = 'block';
        return;
      }

      placeholder.style.display = 'none';
      const target = document.getElementById('slot-' + value);
      if (target) {
        target.style.display = 'block';
      }
    });
