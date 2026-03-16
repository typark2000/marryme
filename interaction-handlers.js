window.MarryMeInteractionHandlers = (() => {
  function addRepeatEvents(target, handler) {
    ['mouseenter', 'touchstart', 'focus', 'click'].forEach((eventName) => {
      target.addEventListener(eventName, handler, { passive: eventName !== 'click' });
    });
  }

  function simpleState(label, mutate) {
    return (day, ctx) => {
      let step = 0;
      addRepeatEvents(ctx.noButton, (event) => {
        if (event?.type === 'click') event.preventDefault();
        step += 1;
        if (mutate) mutate(ctx, step, day);
        if (label) {
          ctx.dynamicSlot.innerHTML = `<div class="prop">${typeof label === 'function' ? label(step, day) : label}</div>`;
        }
      });
    };
  }

  const handlers = {};

  handlers['runaway-no'] = (day, ctx) => addRepeatEvents(ctx.noButton, (event) => {
    if (event) event.preventDefault();
    ctx.proposalStage.classList.add('runaway-active');
    const stageRect = ctx.proposalStage.getBoundingClientRect();
    const buttonRect = ctx.noButton.getBoundingClientRect();
    const minX = 16;
    const minY = 140;
    const maxX = Math.max(minX, stageRect.width - buttonRect.width - 16);
    const maxY = Math.max(minY, stageRect.height - buttonRect.height - 16);
    ctx.noButton.style.left = `${minX + Math.random() * Math.max(0, maxX - minX)}px`;
    ctx.noButton.style.top = `${minY + Math.random() * Math.max(0, maxY - minY)}px`;
  });

  handlers['shrinking-no'] = (day, ctx) => {
    let step = 0;
    addRepeatEvents(ctx.noButton, (event) => {
      if (event?.type === 'click') event.preventDefault();
      step += 1;
      ctx.noButton.style.transform = `scale(${Math.max(0.12, 1 - step * 0.12)})`;
    });
  };

  handlers['evasive-no'] = (day, ctx) => {
    let direction = 1;
    addRepeatEvents(ctx.noButton, (event) => {
      if (event) event.preventDefault();
      ctx.noButton.style.transform = `translateX(${direction * 72}px)`;
      direction *= -1;
    });
  };

  handlers['swapping-labels'] = (day, ctx) => {
    const labels = day.interaction.options || [day.noLabel];
    let index = 0;
    addRepeatEvents(ctx.noButton, (event) => {
      if (event?.type === 'click') event.preventDefault();
      index = Math.min(index + 1, labels.length - 1);
      ctx.noButton.textContent = labels[index];
    });
  };

  handlers['growing-yes'] = (day, ctx) => {
    let step = 0;
    addRepeatEvents(ctx.noButton, (event) => {
      if (event?.type === 'click') event.preventDefault();
      step = Math.min(step + 1, 5);
      ctx.yesButton.style.transform = `scale(${1 + step * 0.12})`;
      ctx.noButton.style.opacity = `${Math.max(0.35, 1 - step * 0.12)}`;
    });
  };

  handlers['leaning-choice'] = (day, ctx) => {
    ctx.proposalStage.classList.add('leaning-active');
    addRepeatEvents(ctx.noButton, (event) => {
      if (event?.type === 'click') event.preventDefault();
      ctx.yesButton.style.transform = 'scale(1.08)';
      ctx.noButton.style.transform = 'scale(0.92)';
      ctx.noButton.style.opacity = '0.78';
    });
  };

  handlers['confirm-stack'] = (day, ctx) => addRepeatEvents(ctx.noButton, (event) => {
    if (event) event.preventDefault();
    if (ctx.proposalStage.querySelector('.confirm-overlay')) return;
    const [secondary = '다시 생각해볼게', primary = '그래도 좋아'] = day.interaction.options || [];
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `<div class="confirm-card"><p class="confirm-copy">한 번만 더 생각해줄래?</p><div class="confirm-actions"><button type="button" class="confirm-secondary">${secondary}</button><button type="button" class="confirm-primary">${primary}</button></div></div>`;
    overlay.querySelector('.confirm-secondary').addEventListener('click', (e) => {
      e.currentTarget.textContent = '그래도 좋아 💖';
      overlay.querySelector('.confirm-primary').textContent = '좋아 💖';
    });
    overlay.querySelector('.confirm-primary').addEventListener('click', () => ctx.renderSuccessState(ctx.proposalStage, day));
    ctx.proposalStage.appendChild(overlay);
  });

  handlers['button-swap'] = (day, ctx) => {
    let swapped = false;
    addRepeatEvents(ctx.noButton, (event) => {
      if (event) event.preventDefault();
      if (swapped) return;
      swapped = true;
      ctx.actionsArea.insertBefore(ctx.noButton, ctx.yesButton);
      setTimeout(() => {
        swapped = false;
      }, 220);
    });
  };

  handlers['layout-compress'] = simpleState((step) => `압축 ${Math.min(step, 4)}/4`, (ctx, step) => {
    const clamped = Math.min(step, 4);
    ctx.proposalStage.style.paddingInline = `${24 - clamped * 3}px`;
    ctx.noButton.style.transform = `scale(${Math.max(0.65, 1 - clamped * 0.08)})`;
    ctx.yesButton.style.transform = `scale(${1 + clamped * 0.06})`;
  });

  handlers['multiplying-yes'] = (day, ctx) => {
    let count = 0;
    addRepeatEvents(ctx.noButton, (event) => {
      if (event?.type === 'click') event.preventDefault();
      if (count >= 4) return;
      count += 1;
      const clone = document.createElement('button');
      clone.type = 'button';
      clone.className = 'yes-button yes-clone';
      clone.textContent = day.yesLabel;
      clone.addEventListener('click', () => ctx.renderSuccessState(ctx.proposalStage, day));
      ctx.actionsArea.appendChild(clone);
    });
  };

  handlers['fading-no'] = simpleState((step) => `희미해짐 ${Math.min(step, 5)}/5`, (ctx, step) => {
    const clamped = Math.min(step, 5);
    ctx.noButton.style.opacity = `${Math.max(0.12, 1 - clamped * 0.16)}`;
  });

  handlers['sentence-build'] = (day, ctx) => {
    const parts = day.interaction.options || [];
    let index = 0;
    ctx.dynamicSlot.innerHTML = '<p class="promise-line" id="promiseLine"></p>';
    const line = ctx.dynamicSlot.querySelector('#promiseLine');
    addRepeatEvents(ctx.noButton, (event) => {
      if (event?.type === 'click') event.preventDefault();
      if (index >= parts.length) return;
      line.textContent = `${line.textContent} ${parts[index]}`.trim();
      index += 1;
    });
  };

  handlers['decorative-hide'] = (day, ctx) => {
    ctx.dynamicSlot.innerHTML = '<div class="decor-row"><span>💐</span><span>🎀</span><span>💖</span><span>✨</span></div>';
    let hidden = false;
    addRepeatEvents(ctx.noButton, (event) => {
      if (event) event.preventDefault();
      hidden = !hidden;
      ctx.noButton.classList.toggle('decor-hidden', hidden);
    });
  };

  handlers['card-deck-choice'] = (day, ctx) => {
    ctx.actionsArea.classList.add('card-deck-actions');
    ctx.yesButton.classList.add('card-main');
    ctx.noButton.classList.add('card-sub');
    addRepeatEvents(ctx.noButton, (event) => {
      if (event?.type === 'click') event.preventDefault();
      ctx.yesButton.classList.add('card-main-boost');
      ctx.noButton.classList.add('card-sub-fade');
    });
  };

  handlers['finale-mix'] = (day, ctx) => {
    let step = 0;
    addRepeatEvents(ctx.noButton, (event) => {
      if (event?.type === 'click') event.preventDefault();
      step += 1;
      if (step === 1) ctx.noButton.style.transform = 'translateX(56px)';
      if (step === 2) ctx.yesButton.style.transform = 'scale(1.08)';
      if (step === 3) ctx.noButton.textContent = '그래도 좋아?';
      if (step >= 4) handlers['confirm-stack'](day, ctx);
    });
  };

  const sharedSimpleTypes = (window.MARRYME_INTERACTION_TYPES || []).filter((type) => ![
    'runaway-no','shrinking-no','evasive-no','swapping-labels','growing-yes','leaning-choice','confirm-stack',
    'button-swap','layout-compress','multiplying-yes','fading-no','sentence-build','decorative-hide','card-deck-choice','finale-mix',
    'polaroid-develop','timer-stop'
  ].includes(type));

  sharedSimpleTypes.forEach((type) => {
    handlers[type] = simpleState(type.replace(/-/g, ' '));
  });

  handlers['polaroid-develop'] = (day, ctx) => {
    ctx.dynamicSlot.innerHTML = '<div class="prop faded">현상 중…</div>';
    setTimeout(() => {
      if (ctx.dynamicSlot) ctx.dynamicSlot.innerHTML = '<div class="prop">사진이 다 나왔어</div>';
    }, 1200);
  };

  handlers['timer-stop'] = (day, ctx) => {
    let count = 5;
    ctx.dynamicSlot.innerHTML = `<div class="prop">${count}</div>`;
    const timer = setInterval(() => {
      count = Math.max(0, count - 1);
      if (ctx.dynamicSlot) ctx.dynamicSlot.innerHTML = `<div class="prop">${count}</div>`;
      if (count === 0) clearInterval(timer);
    }, 700);
    addRepeatEvents(ctx.yesButton, (event) => {
      if (event?.type === 'click') clearInterval(timer);
    });
  };

  return { handlers };
})();
