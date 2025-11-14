-- Create business_industry enum
CREATE TYPE business_industry AS ENUM (
  'healthcare',
  'fitness',
  'manufacturing',
  'technology',
  'professional_services',
  'real_estate',
  'education',
  'retail',
  'hospitality',
  'construction',
  'financial_services',
  'nonprofit',
  'creative_agency',
  'other'
);

-- Add industry column to profiles
ALTER TABLE profiles ADD COLUMN industry business_industry;

-- Add master achievements for system completion
INSERT INTO achievements (code, name, description, icon, points, pal) VALUES
  ('content_system_25', '25% System Complete', 'Completed 25% of your video marketing system', '🎯', 250, 'system'),
  ('content_system_50', '50% System Complete', 'Completed 50% of your video marketing system', '🔥', 500, 'system'),
  ('content_system_75', '75% System Complete', 'Completed 75% of your video marketing system', '⭐', 750, 'system'),
  ('content_system_master', 'Content System Master', 'Completed your entire video marketing system across all Pals!', '👑', 2000, 'system'),
  ('reel_pal_complete', 'Reel Master', 'Completed all Reel Pal videos', '📱', 400, 'reel'),
  ('evergreen_pal_complete', 'Evergreen Expert', 'Completed all Evergreen Pal videos', '🌲', 400, 'evergreen'),
  ('spotlight_pal_complete', 'Spotlight Pro', 'Completed all Spotlight Pal videos', '🎬', 400, 'spotlight'),
  ('system_pal_complete', 'System Architect', 'Completed all System Pal videos', '⚙️', 400, 'system');

-- Create function to get total system completion percentage
CREATE OR REPLACE FUNCTION get_total_system_completion(p_user_id UUID)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  total_items INTEGER;
  completed_items INTEGER;
BEGIN
  -- Count total checklist items across all pals
  SELECT COUNT(*) INTO total_items
  FROM (
    SELECT DISTINCT video_id FROM user_video_checklist
    WHERE user_id = p_user_id
  ) AS distinct_items;
  
  -- If no items tracked yet, return 0
  IF total_items = 0 THEN
    RETURN 0;
  END IF;
  
  -- Count completed items
  SELECT COUNT(*) INTO completed_items
  FROM user_video_checklist
  WHERE user_id = p_user_id AND completed = true;
  
  -- Return percentage
  RETURN ROUND((completed_items::DECIMAL / total_items::DECIMAL) * 100);
END;
$$;

-- Create function to check and unlock achievements based on completion
CREATE OR REPLACE FUNCTION check_and_unlock_achievements()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  completion_pct INTEGER;
  pal_total INTEGER;
  pal_completed INTEGER;
BEGIN
  -- Get overall completion percentage
  completion_pct := get_total_system_completion(NEW.user_id);
  
  -- Check and unlock milestone achievements
  IF completion_pct >= 25 AND NOT EXISTS (
    SELECT 1 FROM user_achievements 
    WHERE user_id = NEW.user_id AND achievement_code = 'content_system_25'
  ) THEN
    INSERT INTO user_achievements (user_id, achievement_code) VALUES (NEW.user_id, 'content_system_25');
  END IF;
  
  IF completion_pct >= 50 AND NOT EXISTS (
    SELECT 1 FROM user_achievements 
    WHERE user_id = NEW.user_id AND achievement_code = 'content_system_50'
  ) THEN
    INSERT INTO user_achievements (user_id, achievement_code) VALUES (NEW.user_id, 'content_system_50');
  END IF;
  
  IF completion_pct >= 75 AND NOT EXISTS (
    SELECT 1 FROM user_achievements 
    WHERE user_id = NEW.user_id AND achievement_code = 'content_system_75'
  ) THEN
    INSERT INTO user_achievements (user_id, achievement_code) VALUES (NEW.user_id, 'content_system_75');
  END IF;
  
  IF completion_pct >= 100 AND NOT EXISTS (
    SELECT 1 FROM user_achievements 
    WHERE user_id = NEW.user_id AND achievement_code = 'content_system_master'
  ) THEN
    INSERT INTO user_achievements (user_id, achievement_code) VALUES (NEW.user_id, 'content_system_master');
  END IF;
  
  -- Check individual pal completion
  SELECT COUNT(*), COUNT(*) FILTER (WHERE completed = true)
  INTO pal_total, pal_completed
  FROM user_video_checklist
  WHERE user_id = NEW.user_id AND pal = NEW.pal;
  
  -- Unlock pal-specific achievement if all items completed
  IF pal_total > 0 AND pal_completed = pal_total THEN
    IF NEW.pal = 'reel' AND NOT EXISTS (
      SELECT 1 FROM user_achievements 
      WHERE user_id = NEW.user_id AND achievement_code = 'reel_pal_complete'
    ) THEN
      INSERT INTO user_achievements (user_id, achievement_code) VALUES (NEW.user_id, 'reel_pal_complete');
    END IF;
    
    IF NEW.pal = 'evergreen' AND NOT EXISTS (
      SELECT 1 FROM user_achievements 
      WHERE user_id = NEW.user_id AND achievement_code = 'evergreen_pal_complete'
    ) THEN
      INSERT INTO user_achievements (user_id, achievement_code) VALUES (NEW.user_id, 'evergreen_pal_complete');
    END IF;
    
    IF NEW.pal = 'spotlight' AND NOT EXISTS (
      SELECT 1 FROM user_achievements 
      WHERE user_id = NEW.user_id AND achievement_code = 'spotlight_pal_complete'
    ) THEN
      INSERT INTO user_achievements (user_id, achievement_code) VALUES (NEW.user_id, 'spotlight_pal_complete');
    END IF;
    
    IF NEW.pal = 'system' AND NOT EXISTS (
      SELECT 1 FROM user_achievements 
      WHERE user_id = NEW.user_id AND achievement_code = 'system_pal_complete'
    ) THEN
      INSERT INTO user_achievements (user_id, achievement_code) VALUES (NEW.user_id, 'system_pal_complete');
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to check achievements on checklist updates
CREATE TRIGGER on_checklist_update
  AFTER INSERT OR UPDATE ON user_video_checklist
  FOR EACH ROW
  EXECUTE FUNCTION check_and_unlock_achievements();